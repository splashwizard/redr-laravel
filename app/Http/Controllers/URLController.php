<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Models\Url;
use Illuminate\Support\Facades\Log;

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
                'dateUpdated' => date_format($url['updated_at'], 'YYYY-MM-DD')
            ];
        }
        return response()->json($response);
    }

    public function store(Request $request)
    {
        // Validate the incoming request
        // $request->validate([
        //     'url' => 'required|url|unique:urls,url',
        // ]);

        // Create a new URL record
    
        $bulk_urls = preg_split('/\r\n|\r|\n/', $request->input('bulkURL')); // Assign value from request
        foreach($bulk_urls as $bulk_url){
            $url = new Url();
            $url->sourceURL = $request->input('singleURL'); // Assign value from request
            $url->shortURL = $bulk_url;
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
        $url->update();

        // Return a success response
        return response()->json(['message' => 'URL updated successfully!', 'data' => $url], 201);
    }

    public function delete(Request $request)
    {
        Url::where('id', $request->id)->delete();
        return response()->json(['message' => 'URL deleted successfully!'], 201);
    }

    // public function show(string $id)
    // {
    //     $urls = Url::get();
    //     return response()->json($urls);
    // }
}