import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import redrLogoLogin from '/resources/img/redr-logo-login.png';
import GoogleIcon from '/resources/img/icon/google.png';
import '../../../css/login.css';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="account-section bg_img">
            <div className="container">
                <div className="account-title d-flex justify-center">
                    <Link href={route('home')} className="back-home"><i className="material-icons">arrow_back</i><span>Back <span className="d-none d-sm-inline-block">To redr.io</span></span></Link>
                    <Link href={route('home')} className="logo">
                        <img src={redrLogoLogin} alt="logo" />
                    </Link>
                </div>
                {children}
                {/* <div className="account-wrapper aos-init aos-animate" data-aos="fade-up">
                    <div className="account-body">
                        <h4 className="title mb-20">Welcome To redr.io23</h4>
                        {children}
                    </div>
                    <div className="or">
                        <span>OR</span>
                    </div>
                    <div className="account-header pb-0">
                        <span className="d-block mb-30 mt-2">Sign up with your work email</span>
                        <a href="#0" className="sign-in-with"><img src={GoogleIcon} alt="icon" /><span>Sign In with Google</span></a>
                        <span className="d-block mt-15">Don't have an account? <Link href={route('register')}>Sign Up Here</Link></span>
                    </div>
                </div> */}

                {/* <div className="brand-section">
                <div className="swiper mySwiper swiper-initialized swiper-horizontal swiper-backface-hidden">
                    <div className="swiper-wrapper" id="swiper-wrapper-d8c680e4316563105" aria-live="off" style={{transitionDuration: '0ms', transform: 'translate3d(-267.2px, 0px, 0px)', transitionDelay: '0ms'}}>                                    
                    <div className="swiper-slide swiper-slide-prev" role="group" aria-label="1 / 6" data-swiper-slide-index="0" style={{width: 227.2, marginRight: 40}}>
                    <img src="assets/img/icon/slider/mojave.png" alt="image"></div><div className="swiper-slide swiper-slide-active" role="group" aria-label="2 / 6" data-swiper-slide-index="1" style={{width: 227.2, marginRight: 40}}>
                    <img src="assets/img/icon/slider/payy.png" alt="image"></div><div className="swiper-slide swiper-slide-next" role="group" aria-label="3 / 6" data-swiper-slide-index="2" style={{width: 227.2, marginRight: 40}}>
                    <img src="assets/img/icon/slider/caqtus.png" alt="image"></div><div className="swiper-slide" role="group" aria-label="4 / 6" data-swiper-slide-index="3" style={{width: 227.2, marginRight: 40}}>
                    <img src="assets/img/icon/slider/hunny.png" alt="image"></div><div className="swiper-slide" role="group" aria-label="5 / 6" data-swiper-slide-index="4" style={{width: 227.2, marginRight: 40}}>
                    <img src="assets/img/icon/slider/hoodoo.png" alt="image"></div><div className="swiper-slide" role="group" aria-label="6 / 6" data-swiper-slide-index="5" style={{width: 227.2, marginRight: 40}}>
                    <img src="assets/img/icon/slider/parsley.png" alt="image"></div>
                </div> */}
                </div>
            </div>
            
        // <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        //     <div className="w-full max-w-sm">
        //         <div className="flex flex-col gap-8">
        //             <div className="flex flex-col items-center gap-4">
        //                 <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
        //                     <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md">
        //                         <AppLogoIcon className="size-9 fill-current text-[var(--foreground)] dark:text-white" />
        //                     </div>
        //                     <span className="sr-only">{title}</span>
        //                 </Link>

        //                 <div className="space-y-2 text-center">
        //                     <h1 className="text-xl font-medium">{title}</h1>
        //                     <p className="text-muted-foreground text-center text-sm">{description}</p>
        //                 </div>
        //             </div>
        //             {children}
        //         </div>
        //     </div>
        // </div>
    );
}
