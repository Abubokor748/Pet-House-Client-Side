import { Link } from 'react-router-dom';
import logoPic from '../../../assets/logoPicture.jpg'

const Footer = () => {
    return (
        <footer className="bg-neutral text-neutral-content">
            {/* Main Footer Section */}
            <div className="footer p-10 bg-gradient-to-r from-neutral-800 to-neutral-900 flex justify-evenly flex-col md:flex-row">
                {/* Brand Section */}
                <div className="text-center md:text-left">
                    <h2 className="text-3xl font-bold text-white">Pet House</h2>
                    <p className="text-gray-400">A Temporary Home For Pets.</p>
                </div>

                {/* Company Info Section */}
                <div className="mx-auto md:text-left">
                    <Link to="/">
                        <img src={logoPic} alt="" className='w-14 rounded-full' />
                    </Link>
                    <p className="text-gray-400 mt-2">
                        Pets House Ltd.<br />
                        Providing reliable pet help since 2024
                    </p>
                </div>

                {/* Social Links Section */}
                <div className="text-center md:text-left">
                    <span className="footer-title text-white">Social</span>
                    <div className="grid grid-flow-col gap-4 justify-center md:justify-start">
                        <a
                            href="https://www.facebook.com/absiddique748" target="blank"
                            className="hover:text-blue-600 transition-colors duration-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current"
                            >
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="p-4 footer-center bg-neutral-900 text-gray-400">
                <div className="text-center">
                    <p>Copyright © 2025 - All right reserved by Pet House Ltd</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;