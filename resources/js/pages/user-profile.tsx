import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import '../../css/dashboard.css';
import '../../css/user-profile.css';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
//   Title,
//   Tooltip,
//   Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import PayyIcon from '/resources/img/icon/slider/payy.png';
import PlataIcon from '/resources/img/icon/slider/plata.png';
import LetterIcon from '/resources/img/icon/slider/letter.png';

ChartJS.register([CategoryScale, LinearScale, PointElement, LineElement])

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const options = {
    responsive: true,
    scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Traffic Volume",
          },
        },
        x: {
          title: {
            display: true,
            text: "Time",
          },
        },
      },
  };

const data = [
{
    id: 1,
    sourceUrl: "https://example.com/long-url",
    shortUrl: "https://short.url/abc",
    dateUpdated: "2023-10-01",
    expOn: "2023-12-31",
    masked: "Yes",
},
{
    id: 2,
    sourceUrl: "https://test.com/another-long-url",
    shortUrl: "https://short.url/xyz",
    dateUpdated: "2023-09-15",
    expOn: "2023-11-30",
    masked: "No",
},
{
    id: 3,
    sourceUrl: "https://demo.com/yet-another-long-url",
    shortUrl: "https://short.url/123",
    dateUpdated: "2023-08-20",
    expOn: "2023-10-31",
    masked: "Yes",
},
];

const labels = {
    "1h": ["00:00", "00:10", "00:20", "00:30", "00:40", "00:50", "01:00"],
    "1d": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "7d": ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    "14d": Array.from({ length: 14 }, (_, i) => `Day ${i + 1}`),
    "30d": Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
  };
const mockData = {
    "1h": [10, 20, 30, 40, 50, 60, 70], // Traffic for 1 hour (7 data points)
    "1d": [100, 200, 150, 300, 250, 400, 350], // Traffic for 1 day (7 data points)
    "7d": [500, 600, 700, 800, 900, 1000, 1100], // Traffic for 7 days (7 data points)
    "14d": [500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800], // Traffic for 14 days
    "30d": Array.from({ length: 30 }, (_, i) => 500 + i * 50), // Traffic for 30 days
};

export default function Dashboard() {
    const [urls, setURLs] = useState(data);
    const [timeRange, setTimeRange] = useState('7d');
    const [dataLabels, setDataLabels] = useState(labels["7d"]);
    const [datasets, setDatasets] = useState([
        {
            label: "Traffic",
            data: mockData["7d"], // Default to 7 days
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
            fill: false,
        },
    ]);
    const [deletingId, setDeletingId] = useState('');
    const [tab, setTab] = useState('subscriptions');

    const handleChangeTimeRange = (e) => {
        setTimeRange(e.target.value);
        updateChart(e.target.value);
    }

    const handleConfirmDelete = () => {
        console.log('setDeletingId', deletingId, urls.filter(url => url.id !== parseInt(deletingId)))
        setURLs(urls.filter(url => url.id !== parseInt(deletingId)));
    }

    const updateChart = (range: string) => {
        setDataLabels(labels[range]);
        setDatasets([
            {
                label: "Traffic",
                data: mockData[range], // Default to 7 days
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                fill: false,
            },
        ])
    }

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Material+Icons" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet"></link>
            <Header />

            <main className="main">
                <section id="dashboard-main" className="dashboard-main section">
                    <div className="container">
                    <div className="container mt-4">
                        <div className="nav-tabs-dropdown btn-group d-block d-md-none">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="tabDropdown" data-bs-toggle="dropdown">Select Option</button>
                        <ul className="dropdown-menu" id="dropdownTabs">
                            <li><a className={tab === 'profile' ? "tab-drop dropdown-item active" : "tab-drop dropdown-item"} data-bs-target="#myprofile-tab">My Profile</a></li>
                            <li><a className={tab === 'subscriptions' ? "tab-drop dropdown-item active" : "tab-drop dropdown-item"} data-bs-target="#subscription-tab">Subscriptions</a></li>
                            <li><a className="tab-drop dropdown-item" data-bs-target="#billing-tab">Billing</a></li>
                            <li><a className="tab-drop dropdown-item" data-bs-target="#settings-tab">Settings</a></li>
                            <li><a href={route('dashboard')} className="dashboard-btn only-tab-btn tab-drop">Dashboard</a></li>
                            <li><a className="logout-btn only-tab-btn tab-drop">Logout</a></li>
                        </ul>
                        </div>
                        <ul className="nav nav-tabs d-none d-md-flex" id="tabList" role="tablist">
                        <li className="nav-item" role="presentation">
                            <a className={tab === 'profile' ? "tab-drop nav-link active" : "tab-drop nav-link"} data-bs-toggle="tab" href="#myprofile-tab" aria-selected="true" role="tab">My Profile</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className={tab === 'subscriptions' ? "tab-drop nav-link active" : "tab-drop nav-link"} data-bs-toggle="tab" href="#subscription-tab" aria-selected="false" tabindex="-1" role="tab">Subscriptions</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className={tab === 'billing' ? "tab-drop nav-link active" : "tab-drop nav-link"} data-bs-toggle="tab" href="#billing-tab" aria-selected="false" tabindex="-1" role="tab">Billing</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className={tab === 'settings' ? "tab-drop nav-link active" : "tab-drop nav-link"} data-bs-toggle="tab" href="#settings-tab" aria-selected="false" tabindex="-1" role="tab">Settings</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a href={route('dashboard')} className="dashboard-btn only-tab-btn tab-drop nav-link" aria-selected="false" tabindex="-1" role="tab">Dashboard</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            {/* <a className="logout-btn only-tab-btn tab-drop nav-link" aria-selected="false" tabindex="-1" role="tab">Logout</a> */}
                            <Link className="logout-btn only-tab-btn tab-drop nav-link" method="post" href={route('logout')} as="button">
                                Logout
                            </Link>
                        </li>
                        </ul>

                        <div className="tab-content">
                        <div className={tab === 'profile' ? "tab-pane fade show active" : "tab-pane fade"} id="myprofile-tab" role="tabpanel">
                            <div className="container mt-3">
                            <h2>My Profile</h2>
                            </div>
                        </div>

                        <div className={tab === 'subscriptions' ? "tab-pane fade show active" : "tab-pane fade"} id="subscription-tab" role="tabpanel">
                            <div className="datd-tbl container mt-3">
                            <div className="head-title">
                                <h2>Subscription</h2>
                            </div>
                            </div>
                        </div>
                        <div className={tab === 'billing' ? "tab-pane fade show active" : "tab-pane fade"} id="billing-tab" role="tabpanel">
                            <div className="datd-tbl container mt-3">
                            <h2>Billing Details</h2>
                            </div>
                        </div>
                        <div className={tab === 'settings' ? "tab-pane fade show active" : "tab-pane fade"} id="settings-tab" role="tabpanel">
                            <div className="datd-tbl container mt-3">
                            <h2>Settings</h2>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </section>
                </main>
            <Footer />
        </>
    );
    
    // <div>23423</div>
        // <AppLayout breadcrumbs={breadcrumbs}>
        //     <Head title="Dashboard" />
        //     <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        //         <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        //             <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
        //                 <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
        //             </div>
        //             <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
        //                 <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
        //             </div>
        //             <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
        //                 <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
        //             </div>
        //         </div>
        //         <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
        //             <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
        //         </div>
        //     </div>
        // </AppLayout>
}
