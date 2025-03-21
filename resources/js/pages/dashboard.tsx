import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import '../../css/dashboard.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

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
    sourceUrl: "https://example.com/long-urlaaaaaaaaaaaaaaaaab",
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
    "30d": Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
  };
const mockData = {
    "1h": [10, 20, 30, 40, 50, 60, 70], // Traffic for 1 hour (7 data points)
    "1d": [100, 200, 150, 300, 250, 400, 350], // Traffic for 1 day (7 data points)
    "7d": [500, 600, 700, 800, 900, 1000, 1100], // Traffic for 7 days (7 data points)
    "30d": Array.from({ length: 30 }, (_, i) => 500 + i * 50), // Traffic for 30 days
};

function UrlTr({ url, setDeletingId } : any) {
    const [isSetting, setIsSetting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [sourceURL, setSourceURL] = useState(url.sourceURL);
    const [shortURL, setShortURL] = useState(url.shortURL);
    const [dateUpdated, setDateUpdated] = useState(url.dateUpdated);
    const [expOn, setExpOn] = useState(url.expOn);
    const [masked, setMasked] = useState(url.masked);

    const handleClickSetting = () => {
        setIsSetting(true);
    }

    const handleClickEdit = () => {
        setIsEditing(true);
    }

    const handleClickSave = () => {
        axios
            .post(`urls/${url.id}`, {
                sourceURL,
                shortURL,
                masked
            })
            .then((response) => {
                setIsEditing(false);
                setIsSetting(false);
            })
            .catch((error) => {
                console.log({ errors: error.response.data.errors })
        });
    }

    const handleDelete = () => {
        setDeletingId(url.id);

    }

    return (
        <tr>
            <td><input type="checkbox" className="row-checkbox" data-id="1"/></td>
            <td><span className="editable" data-field="sourceUrl">{ isEditing ? <input className="editable-input" value={sourceURL} onChange={(e) => setSourceURL(e.target.value)} /> : sourceURL}</span></td>
            <td><span className="editable" data-field="shortUrl">{ isEditing ? <input className="editable-input" value={shortURL} onChange={(e) => setShortURL(e.target.value)} /> : shortURL}</span></td>
            <td><span className="editable" data-field="dateUpdated">{ dayjs(dateUpdated).format("YYYY-MM-DD") }</span></td>
            <td><span className="editable" data-field="expOn">{ dayjs(expOn).format("YYYY-MM-DD") }</span></td>
            {/* <td><span className="editable" data-field="dateUpdated">{masked}</span></td> */}
            {/* <td><span className="editable" data-field="expOn">{ isEditing ? <input className="editable-input" value={expOn} onChange={(e) => setExpOn(e.target.value)} /> : expOn}</span></td> */}
            <td>
                <span className="editable" data-field="dateUpdated">{
                    isEditing ? (
                        <input type="checkbox" className="editable-input" checked={masked} value={masked} onChange={(e) => setMasked(e.target.checked)} /> 
                    ) : masked ? "Yes" : "No"
                }</span>
            </td>
            <td>
                {isSetting ? isEditing ? <button className="btn btn-sm btn-success save-button" data-id={url.id} onClick={handleClickSave}>
                    <i className="material-icons">check</i> Save
                </button>: (
                    <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-primary edit-button" data-id={url.id} onClick={handleClickEdit}>
                      <i className="material-icons">edit</i> Edit
                    </button>
                    <button className="btn btn-sm btn-outline-danger delete-button" data-bs-toggle="modal" data-bs-target="#deleteConfirmationModal" data-id={url.id} onClick={handleDelete}>
                      <i className="material-icons">delete</i> Delete
                    </button>
                  </div>
                ) : <button className="btn-conf-row btn btn-sm btn-outline-secondary configure-button" data-id={url.id} onClick={handleClickSetting}>
                    <i className="material-icons">settings</i>
                </button>
                }
            </td>
        </tr>
    )
}

export default function Dashboard() {
    const [urls, setURLs] = useState([]);
    const [timeRange, setTimeRange] = useState('7d');
    const [dataLabels, setDataLabels] = useState(labels["7d"]);
    const [datasets, setDatasets] = useState([]);
    const [deletingId, setDeletingId] = useState('');
    const [newUrl, setNewURL] = useState({
        singleURL: '',
        bulkURL: ''
    });
    const [file, setFile] = useState(null);
    const closeRef = useRef(null);
    const deleteRef = useRef(null);

    const [payChecked, setPayChecked] = useState(false);
    const [plataChecked, setPlataChecked] = useState(false);
    const [latterChecked, setLatterChecked] = useState(false);
    const [tab, setTab] = useState('dashboard');


    useEffect(() => {
        fetchURLs();
        updateChart(timeRange);
    }, [])

    useEffect(() => {
        if(tab === "dashboard") {
            console.log('dfd')
            updateChart(timeRange);
        }
    }, [tab])

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const fetchURLs = () => {
        axios.get('urls').then((response) => {
            setURLs(response.data);
        })
    }

    const handleChangeTimeRange = (e) => {
        setTimeRange(e.target.value);
        updateChart(e.target.value);
    }

    const handleConfirmDelete = () => {
        // 
        axios
            .delete(`urls/${deletingId}`)
            .then((response) => {
                setURLs(urls.filter(url => url.id !== parseInt(deletingId)));
                deleteRef.current.click();
            })
            .catch((error) => {
                console.log({ errors: error.response.data.errors })
        });
    }

    const updateChart = (range: string) => {
        axios
            .post("urls/report", { range })
            .then((response) => {
                setDataLabels(response.data.labels);
                setDatasets([
                    {
                        label: "Traffic",
                        data: response.data.data, // Default to 7 days
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 2,
                        fill: false,
                    }
                ])
            })
            .catch((error) => console.log(error.response.data.errors));
        // setDataLabels(labels[range]);
        // setDatasets([
        //     {
        //         label: "Traffic",
        //         data: mockData[range], // Default to 7 days
        //         borderColor: "rgba(75, 192, 192, 1)",
        //         borderWidth: 2,
        //         fill: false,
        //     },
        // ])
    }

    const updateNewURL = (property: string, value: string) => {
        setNewURL({
            ...newUrl,
            [property]: value
        })
    }

    const handleAddURL = (e) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('singleURL', newUrl.singleURL);
        formData.append('bulkURL', newUrl.bulkURL);
        e.preventDefault();
        axios
            .post("urls", formData)
            .then((response) => {
                closeRef.current.click();
                fetchURLs();

            })
            .catch((error) => this.setState({ errors: error.response.data.errors }));
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
                                <li><a className="tab-drop dropdown-item active" data-bs-target="#dashboard-tab">Dashboard</a></li>
                                <li><a className="tab-drop dropdown-item" data-bs-target="#url-tab">URLs</a></li>
                                <li><a className="tab-drop dropdown-item" data-bs-target="#report-tab">Reports</a></li>
                                <li><a className="tab-drop dropdown-item" data-bs-target="#integration-tab">Integrations</a></li>
                            </ul>
                            </div>

                            <ul className="nav nav-tabs d-none d-md-flex" id="tabList" role="tablist">
                            <li className="nav-item" role="presentation">
                                <a className="tab-drop nav-link active" onClick={() => setTab('dashboard')} data-bs-toggle="tab" href="#dashboard-tab" aria-selected="true" role="tab">Dashboard</a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a className="tab-drop nav-link" onClick={() => setTab('URLs')} data-bs-toggle="tab" href="#url-tab" aria-selected="false" role="tab" tabIndex={-1}>URLs</a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a className="tab-drop nav-link" onClick={() => setTab('reports')} data-bs-toggle="tab" href="#report-tab" aria-selected="false" tabIndex={-1} role="tab">Reports</a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a className="tab-drop nav-link" onClick={() => setTab('integrations')} data-bs-toggle="tab" href="#integration-tab" aria-selected="false" tabIndex={-1} role="tab">Integrations</a>
                            </li>
                            </ul>

                            <div className="tab-content">
                            <div className="tab-pane fade active show" id="dashboard-tab" role="tabpanel">
                                <div className="container mt-3">
                                <h2>Traffic Statistics</h2>
                                <div className="graph-area mt-4">
                                    <div className="filters-graph">
                                    <label htmlFor="timeRange" className="form-label">Select Time Range:</label>
                                    <select className="form-select" id="timeRange" value={timeRange} onChange={handleChangeTimeRange} >
                                        <option value="1d">1 Day</option>
                                        <option value="7d" selected>7 Days</option>
                                        <option value="30d">30 Days</option>
                                    </select>
                                    </div>
                                    {/* <canvas id="trafficChart" width="1144" height="572" style={{display: 'block', boxSizing: 'border-box', height: 572, width: 1144}}></canvas> */}
                                    <Line options={options} data={{ labels: dataLabels, datasets }} />
                                </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="url-tab" role="tabpanel">
                                <div className="datd-tbl container mt-3">
                                <div className="head-title">
                                    <h2>URL Management</h2>
                                    <div className="btn-sec">
                                    <button id="manage-button" className="mng-bun" style={{display: 'none'}}><i className="material-icons">settings</i> Manage</button>
                                    <button id="add-urls-button" className="add-bun" data-bs-toggle="modal" data-bs-target="#add-urls-modal">
                                        <i className="material-icons">add</i> Add URLs
                                    </button>
                                    </div>

                                    <div className="modal fade" id="add-urls-modal" tabIndex={-1} aria-labelledby="add-urls-modal-label" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="add-urls-modal-label">Add URLs</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" ref={closeRef} aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form id="add-urls-form">
                                            <div className="mb-3">
                                                <label htmlFor="single-url" className="form-label">Add Single URL</label>
                                                <input type="text" className="form-control" id="single-url" value={newUrl.singleURL}  onChange={e => updateNewURL('singleURL', e.target.value) }placeholder="Enter a single URL" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="bulk-urls" className="form-label">Add URLs in Bulk</label>
                                                <textarea className="form-control" id="bulk-urls" rows={3} value={newUrl.bulkURL} onChange={e => updateNewURL('bulkURL', e.target.value)} placeholder="Enter URLs separated by new lines"></textarea>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="excel-upload" className="form-label">Upload Excel Document</label>
                                                <input className="form-control" type="file" id="excel-upload" onChange={onFileChange} accept=".xlsx, .xls"/>
                                            </div>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="submit" className="btn add-buy" form="add-urls-form" onClick={handleAddURL}>Add URL(s)</button>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="table-responsive tbl-div mt-4">
                                    <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                        <th><input className="check-all-row" type="checkbox" id="select-all"/></th>
                                        <th>Source URL</th>
                                        <th>Short URL</th>
                                        <th>Date Updated</th>
                                        <th>Exp. On</th>
                                        <th>Masked</th>
                                        <th>Configure</th>
                                        </tr>
                                    </thead>
                                    <tbody id="table-body">
                                        {
                                            urls.map((url, index) => (
                                                <UrlTr key={url.id} url={url} setDeletingId={setDeletingId}/>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                </div>
                                <div className="modal fade" id="deleteConfirmationModal" tabIndex={-1} aria-labelledby="deleteConfirmationModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                        <h5 className="modal-title" id="deleteConfirmationModalLabel">Confirm Delete</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" ref={deleteRef} aria-label="Close"></button>
                                        </div>
                                        <input type="hidden" value={deletingId} />
                                        <div className="modal-body">Are you sure you want to delete this item?</div>
                                        <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                        <button type="button" className="btn btn-danger" id="confirmDeleteButton" onClick={handleConfirmDelete}>Delete</button>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>

                            <div className="tab-pane fade" id="report-tab" role="tabpanel">
                                <div className="datd-tbl container mt-3">
                                <h2>Report Management</h2>
                                <div className="report-row row mt-4">
                                    <div className="brand-card card">
                                    <div className="card-btm">
                                        <h5>Type of Report</h5>
                                    </div>
                                    </div>

                                    <div className="brand-card card">
                                    <div className="card-btm">
                                        <h5>Traffic by Domain</h5>
                                    </div>
                                    </div>

                                    <div className="brand-card card">
                                    <div className="card-btm">
                                        <h5>Expiring Report</h5>
                                    </div>
                                    </div>

                                    <div className="brand-card card">
                                    <div className="card-btm">
                                        <h5>URLs with no Traffic</h5>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>

                            <div className="tab-pane fade" id="integration-tab" role="tabpanel">
                                <div className="datd-tbl container mt-3">
                                <h2>Integrations Management</h2>
                                <div className="row mt-4">
                                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4">
                                    <div className={payChecked ? "brand-card card active-card" : "brand-card card"}>
                                        <img src={PayyIcon} alt="Brand Logo" className="brand-logo"/>
                                        <div className="card-btm">
                                        <div className="config-tab">
                                            <h5>payy.us</h5>
                                            <button type="button" className="api-conf" data-bs-toggle="modal" data-bs-target="#apiModal" data-api-key="key1" data-secret-key="secret1">
                                            API Config
                                            </button>
                                        </div>

                                        <label className="switch">
                                            <input className="togle-sw" type="checkbox" checked={payChecked} onChange={() => setPayChecked(!payChecked)}/>
                                            <span className="slider"></span>
                                        </label>
                                        </div>
                                    </div>
                                    </div>

                                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4">
                                    <div className={plataChecked ? "brand-card card active-card" : "brand-card card"}>
                                        <img src={PlataIcon} alt="Brand Logo" className="brand-logo"/>
                                        <div className="card-btm">
                                        <div className="config-tab">
                                            <h5>plata.lat</h5>
                                            <button type="button" className="api-conf" data-bs-toggle="modal" data-bs-target="#apiModal" data-api-key="key2" data-secret-key="secret2">
                                            API Config
                                            </button>
                                        </div>
w
                                        <label className="switch">
                                            <input className="togle-sw" type="checkbox" checked={plataChecked} onChange={() => setPlataChecked(!plataChecked)}/>
                                            <span className="slider"></span>
                                        </label>
                                        </div>
                                    </div>
                                    </div>

                                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4">
                                    <div className={latterChecked ? "brand-card card active-card" : "brand-card card"}>
                                        <img src={LetterIcon} alt="Brand Logo" className="brand-logo"/>
                                        <div className="card-btm">
                                        <div className="config-tab">
                                            <h5>latter.co</h5>
                                            <button type="button" className="api-conf" data-bs-toggle="modal" data-bs-target="#apiModal" data-api-key="key3" data-secret-key="secret3">
                                            API Config
                                            </button>
                                        </div>

                                        <label className="switch">
                                            <input className="togle-sw" type="checkbox" checked={latterChecked} onChange={() => setLatterChecked(!latterChecked)}/>
                                            <span className="slider"></span>
                                        </label>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div className="modal fade" id="apiModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">API Details</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                        <p><strong>API Key:</strong> <span className="apiedit" id="modalApiKey"></span></p>
                                        <p><strong>Secret Key:</strong> <span className="apiedit" id="modalSecretKey"></span></p>
                                        </div>
                                        <div className="modal-footer">
                                        <button type="button" className="btn edit-button-api" id="editBtn">Edit</button>
                                        <button type="button" className="btn btn-success" id="saveBtn" style={{display: 'none'}}>Save</button>
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            {/* <Footer /> */}
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
