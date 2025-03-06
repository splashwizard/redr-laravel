import { Link } from '@inertiajs/react';
import MojaveIcon from '/resources/img/icon/slider/mojave.png';
import PayyIcon from '/resources/img/icon/slider/payy.png';
import CaqtusIcon from '/resources/img/icon/slider/caqtus.png';
import HunnyIcon from '/resources/img/icon/slider/hunny.png';
import HoodooIcon from '/resources/img/icon/slider/hoodoo.png';
import ParsleyIcon from '/resources/img/icon/slider/parsley.png';

export function Footer() {
    return (
        <footer id="footer" className="footer">
            <svg className="curve-svg" width="1920" height="150" viewBox="0 0 1920 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M976.477 61.6611C589.801 62.5915 0 0 0 0V150H1920V0C1920 0 1353.63 60.7536 976.477 61.6611Z" fill="white" />
            </svg>
            <div className="container footer-top contact">
                <div className="col-lg-8">
                <div className="container section-title" data-aos="fade-up">
                    <h2>Get in touch!</h2>
                    <p>We thrive to ensure that you get the most out of your experience</p>
                </div>
                <form action="#" method="post" className="php-email-form" data-aos="fade-up" data-aos-delay="200">
                    <div className="row gy-4">
                    <div className="col-md-6">
                        <input type="text" name="name" className="form-control" placeholder="Full Name" required="" />
                    </div>

                    <div className="col-md-6">
                        <input type="email" className="form-control" name="email" placeholder="Email" required="" />
                    </div>

                    <div className="col-md-12">
                        <textarea className="form-control" name="message" rows="6" placeholder="Message" required=""></textarea>
                    </div>

                    <div className="col-md-12 text-center">
                        <div className="loading">Loading</div>
                        <div className="error-message"></div>
                        <div className="sent-message">Your message has been sent. Thank you!</div>

                        <div className="form-footer">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="gridCheck1" />
                            <label className="form-check-label" htmlFor="gridCheck1"> I agree to receive emails, newsletters and promotional messages </label>
                        </div>
                        <div className="line"></div>
                        <button type="submit">Send Message</button>
                        </div>
                    </div>
                    </div>
                </form>
                </div>
            </div>

            <div className="brand-section">
                <div className="swiper mySwiper container">
                <div className="swiper-wrapper">
                    <div className="swiper-slide"><img src={MojaveIcon} alt="image" /></div>
                    <div className="swiper-slide"><img src={PayyIcon} alt="image" /></div>
                    <div className="swiper-slide"><img src={CaqtusIcon} alt="image" /></div>
                    <div className="swiper-slide"><img src={HunnyIcon} alt="image" /></div>
                    <div className="swiper-slide"><img src={HoodooIcon} alt="image" /></div>
                    <div className="swiper-slide"><img src={ParsleyIcon} alt="image" /></div>
                </div>
                <div className="swiper-pagination"></div>
                </div>
            </div>

            <div className="cory-inner text-center">
                <div className="copyright container">
                <div className="">
                    <p>© <span>Copyright 2025 | </span> <strong className="px-1 sitename">redr.io</strong> <span>All Rights Reserved</span></p>
                </div>
                </div>
            </div>
        </footer>
    )
}