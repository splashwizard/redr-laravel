import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
// import { useLocation } from 'react-router-dom'

import redrLogo from '/resources/img/redr-logo.png';
import UserIcon from '/resources/img/icon/user.png';

export function Header() {
    const { auth } = usePage<SharedData>().props;
    // const location = useLocation()

    // console.log('location.pathname', location.pathname);

    console.log('auth', auth)

    return (
        <header id="header" className="header d-flex align-items-center fixed-top">
            <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
                <div className="col-3">
                    <a href="index.html" className="logo d-flex align-items-left">
                        <img id="white-bg-ed" src={redrLogo} alt="Logo" />
                        <img id="black-bg-ed" src="assets/img/redr-logo-color.png" alt="Logo" style={{display: 'none'}} />
                    </a>
                </div>

                {
                    auth && auth.user ? (
                        <div className="col-9 navbar-menu-wrapper d-flex align-items-top">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item dropdown user-dropdown">
                                    <a className="nav-link" id="UserDropdown" href="#" aria-expanded="false">
                                        <p className="fw-semibold">Kevin Medina</p>
                                        <img className="user-def img-xs rounded-circle" src={UserIcon} alt="Profile image" />
                                        <i className="material-icons-outlined dropdown-item-icon text-primary down-arr">keyboard_arrow_down</i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="UserDropdown" data-popper-placement="bottom-start" style={{position: 'absolute', inset: '0px auto auto 0px', margin: 0, transform: 'translate(0px, 58px)'}}>
                                        <div className="dropdown-header text-center">
                                        <a style={{display: 'inline-block'}}><img className="user-def img-md rounded-circle" src={UserIcon} alt="Profile image" /></a>
                                            <p className="mb-1 mt-3 fw-semibold">Kevin Medina</p>
                                            <p className="fw-light text-muted mb-0">kevinmedina@gmail.com</p>
                                        </div>
                                        <a href={route('user-profile')} className="dropdown-item"><i className="material-icons-outlined dropdown-item-icon text-primary">person</i> My Profile
                                        </a>
                                        <a href="#" className="dropdown-item"><i className="material-icons-outlined dropdown-item-icon text-primary">loyalty</i> Subscriptions</a>
                                        <a href="#" className="dropdown-item"><i className="material-icons-outlined dropdown-item-icon text-primary">paid</i> Billing</a>
                                        <a href="#" className="dropdown-item"><i className="material-icons-outlined dropdown-item-icon text-primary">settings</i> Settings</a>
                                        <Link className="block w-full" method="post" href={route('logout')} as="button">
                                            <i className="material-icons-outlined dropdown-item-icon text-primary">power_settings_new</i>
                                            Logout
                                        </Link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <>
                            <nav id="navmenu" className="navmenu d-flex align-items-center">
                                <ul>
                                    <li><Link href={route('home')} className="active">Home</Link></li>
                                    <li><Link href={route('about-us')}>About us</Link></li>
                                    <li><Link href={route('pricing')}>Pricing</Link></li>
                                    <li className="dropdown">
                                    <a href="#"><span>Help</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                                    <ul>
                                        <li><a href="#">Knowledgebase</a></li>
                                        <li><a href="#">Contact Us</a></li>
                                    </ul>
                                    </li>
                                    <li className="only-mob">
                                    <Link href={route('login')} className="login-btn theme-btn me-sm-4">LOGIN</Link>
                                    </li>
                                    <li className="only-mob">
                                    <Link href={route('register')} className="reg-btn theme-btn me-sm-4">REGISTER</Link>
                                    </li>
                                </ul>
                                <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
                            </nav>

                            <div className="col-3 right-elements d-none d-xl-flex d-flex align-items-center">
                                <Link href={route('login')} className="login-btn theme-btn me-sm-4">LOGIN</Link>
                                <Link href={route('register')} className="reg-btn theme-btn me-sm-4">REGISTER</Link>
                            </div>
                        </>
                )}
            </div>
        </header>
    )
}