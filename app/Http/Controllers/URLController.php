<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Models\Url;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

function generateLabels() {
    // Get today's date
    $today = date('Y-m-d');
    // 1h labels (using intervals of 10 minutes)
    $labels_1h = [];
    for ($i = 0; $i <= 6; $i++) {
        $labels_1h[] = date('H:i:s', strtotime("+".($i*10)." minutes") - strtotime('00:00'));
    }

    // 1d labels (days of the week)
    $labels_1d = [];
    for ($i = 0; $i < 24; $i++) {
        $labels_1d[] = date('H:00', strtotime("+".$i." hours") - strtotime('00:00'));
    }
    $labels_1d = array_reverse($labels_1d);

    // 7d labels (specific dates in the last 7 days)
    $labels_7d = [];
    for ($i = 6; $i >= 0; $i--) {
        $labels_7d[] = date('Y-m-d', strtotime("-$i days"));
    }

    // 30d labels (specific dates in the last 30 days)
    $labels_30d = [];
    for ($i = 29; $i >= 0; $i--) {
        $labels_30d[] = date('Y-m-d', strtotime("-$i days"));
    }

    // Return labels
    return [
        "1h" => $labels_1h,
        "1d" => $labels_1d,
        "7d" => $labels_7d,
        "30d" => $labels_30d,
    ];
}

class URLController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function index()
    {
        $urls = Url::all();
        $response = [];
        foreach($urls as $url) {
            // print_r($url->sourceURL);
            $response[] = [
                'id' => $url['id'],
                'sourceURL' => $url['sourceURL'],
                'shortURL' => $url['shortURL'],
                'dateUpdated' => $url['updated_at'],
                'masked' => $url['masked']
            ];
        }
        return response()->json($response);
    }

    public function store(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'file' => 'required|file',
        ]);

        $filePath = $request->file('file')->store('uploads', 'public');

        // Create a new URL record
    
        $bulk_urls = preg_split('/\r\n|\r|\n/', $request->input('bulkURL')); // Assign value from request
        $currentDate = new \DateTime();
        $currentDate->modify('+1 year');
        if(count($bulk_urls) > 0) {
            foreach($bulk_urls as $bulk_url){
                $url = new Url();
                // $url->sourceURL = $request->input('singleURL'); // Assign value from request
                $url->sourceURL = $bulk_url;
                $url->file = $filePath;
                $url->expOn = $currentDate->format('Y-m-d');
                $url->save(); // Save to database
            }
        } else {
            $url = new Url();
            $url->sourceURL = $request->input('singleURL');
            $url->file = $filePath;
            $url->save(); // Save to database
        }

        // Return a success response
        return response()->json(['message' => 'URL added successfully!', 'data' => $url], 201);
    }

    public function change(Request $request)
    {
        $url = Url::find($request->id);

        $url->shortURL = $request->shortURL;
        $url->sourceURL = $request->sourceURL;
        $url->masked = $request->masked;
        $url->update();

        // Return a success response
        return response()->json(['message' => 'URL updated successfully!', 'data' => $url], 201);
    }

    public function delete(Request $request)
    {
        Url::where('id', $request->id)->delete();
        return response()->json(['message' => 'URL deleted successfully!'], 201);
    }

    public function getReport(Request $request)
    {
        $range = $request->input('range', '1d');
        
        // Generate labels
        $availableLabels = generateLabels();

        // Get the current time
        $now = Carbon::now();

        // Determine the starting point based on the selected range
        $query = DB::table('urls'); // Group by hour
        switch ($range) {
            case '1h':
                $startTime = $now->subHour();
                break;
            case '1d':
                $startTime = $now->subDay();
                $query = $query->select(DB::raw('DATE_FORMAT(created_at, "%H:00") as time_slot, count(*) as count'))
                    ->where('created_at', '>=', $startTime)->groupBy(DB::raw('DATE_FORMAT(created_at, "%H:00")'));
                break;
            case '7d':
                $startTime = $now->subDays(7);
                $query = $query->select(DB::raw('DATE_FORMAT(created_at, "%Y-%m-%d") as time_slot, count(*) as count'))
                    ->where('created_at', '>=', $startTime)->groupBy(DB::raw('DATE_FORMAT(created_at, "%Y-%m-%d")'));
                break;
            case '30d':
                $startTime = $now->subDays(30);
                $query = $query->select(DB::raw('DATE_FORMAT(created_at, "%Y-%m-%d") as time_slot, count(*) as count'))
                    ->where('created_at', '>=', $startTime)->groupBy(DB::raw('DATE_FORMAT(created_at, "%Y-%m-%d")'));
                break;
            default:
                $startTime = $now->subDay(); // Default is 1 day
                $query = $query->select(DB::raw('DATE_FORMAT(created_at, "%H:00") as time_slot, count(*) as count'))
                    ->where('created_at', '>=', $startTime)->groupBy(DB::raw('DATE_FORMAT(created_at, "%H:00")'));
                break;
        }
        $result = $query->orderBy('time_slot', 'asc')->get();

        // return response()->json([
        //     'result' => $result,
        // ]);
        // Prepare data for Chart.js
        $labels = [];
        $data = [];

        $available_data = [];

        $labels = $availableLabels[$range];

        foreach ($result as $row) {
            $available_data[$row->time_slot] = $row->count;
            // if(in_array($row->time_slot, $labels))
            //     $data[] = $row->count;
            // else
            //     $data[] = 0;
            // $labels[] = $row->time_slot; // Time slot (hour or day)
            // $data[] = $row->count; // Count of URLs created in that time slot
        }

        foreach ($labels as $label) {
            if(in_array($label, array_keys($available_data)))
                $data[] = $available_data[$label];
            else
                $data[] = 0;
        }



        // Return the response with labels and data
        return response()->json([
            'labels' => $labels,
            'data' => $data
        ]);
    }

    // public function show(string $id)
    // {
    //     $urls = Url::get();
    //     return response()->json($urls);
    // }
}