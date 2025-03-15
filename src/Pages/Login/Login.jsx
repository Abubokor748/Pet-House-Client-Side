import { useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';
import LogInAnimation from '../../assets/Login.json';
import Lottie from 'lottie-react';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [disabled, setDisabled] = useState(true);
    const { signIn } = useAuth();

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
            .then((result) => {
                const user = result.user;
                Swal.fire({
                    title: "User Login Successful",
                    showClass: {
                        popup: "animate__animated animate__fadeInUp animate__faster",
                    },
                    hideClass: {
                        popup: "animate__animated animate__fadeOutDown animate__faster",
                    },
                });
                navigate(from, { replace: true });
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: error.message,
                });
            });
    };

    const handleValidateCaptcha = (e) => {
        const userCaptchaValue = e.target.value;
        if (validateCaptcha(userCaptchaValue)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };

    // Function to handle test user login
    const handleTestUserLogin = () => {
        const testUserEmail = "testuser@example.com";
        const testUserPassword = "Testuser123!";
        signIn(testUserEmail, testUserPassword)
            .then((result) => {
                const user = result.user;
                Swal.fire({
                    title: "Test User Login Successful",
                    showClass: {
                        popup: "animate__animated animate__fadeInUp animate__faster",
                    },
                    hideClass: {
                        popup: "animate__animated animate__fadeOutDown animate__faster",
                    },
                });
                navigate(from, { replace: true });
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Test User Login Failed",
                    text: error.message,
                });
            });
    };

    // Function to handle test admin login
    const handleTestAdminLogin = () => {
        const testAdminEmail = "testadmin@example.com";
        const testAdminPassword = "Testadmin123!";
        signIn(testAdminEmail, testAdminPassword)
            .then((result) => {
                const user = result.user;
                Swal.fire({
                    title: "Test Admin Login Successful",
                    showClass: {
                        popup: "animate__animated animate__fadeInUp animate__faster",
                    },
                    hideClass: {
                        popup: "animate__animated animate__fadeOutDown animate__faster",
                    },
                });
                navigate(from, { replace: true }); 
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Test Admin Login Failed",
                    text: error.message,
                });
            });
    };

    return (
        <>
            <Helmet>
                <title>Pet Adoption | Login</title>
            </Helmet>
            <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gradient-to-r from-purple-50 to-indigo-50">
                {/* Animation Section */}
                <div className="w-full lg:w-1/2 flex justify-center">
                    <Lottie
                        animationData={LogInAnimation}
                        className="w-full max-w-md"
                    />
                </div>

                {/* Login Form Section */}
                <div className="w-full lg:w-1/2 flex justify-center p-4">
                    <div className="card bg-white shadow-2xl rounded-lg w-full max-w-md">
                        <div className="card-body p-6">
                            <h1 className="text-4xl font-bold text-center text-purple-800 mb-6">Login Now!</h1>
                            <form onSubmit={handleLogin} className="space-y-4">
                                {/* Email Input */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-gray-700">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        className="input input-bordered w-full bg-gray-50"
                                        required
                                    />
                                </div>

                                {/* Password Input */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-gray-700">Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        className="input input-bordered w-full bg-gray-50"
                                        required
                                    />
                                    <label className="label">
                                        <Link to="/forgot-password" className="label-text-alt link link-hover text-purple-600">
                                            Forgot password?
                                        </Link>
                                    </label>
                                </div>

                                {/* Captcha Input */}
                                <div className="form-control">
                                    <label className="label">
                                        <LoadCanvasTemplate className="bg-gray-100 p-2 rounded" />
                                    </label>
                                    <input
                                        onBlur={handleValidateCaptcha}
                                        type="text"
                                        name="captcha"
                                        placeholder="Type the captcha above"
                                        className="input input-bordered w-full bg-gray-50"
                                        required
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="form-control mt-6">
                                    <button
                                        disabled={false}
                                        className="btn btn-primary w-full bg-purple-600 hover:bg-purple-700 text-white"
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>

                            {/* Test Login Buttons */}
                            <div className="mt-6 space-y-4">
                                <button
                                    onClick={handleTestUserLogin}
                                    className="btn btn-outline w-full bg-blue-50 hover:bg-blue-100 text-blue-600"
                                >
                                    Login as Test User
                                </button>
                                <button
                                    onClick={handleTestAdminLogin}
                                    className="btn btn-outline w-full bg-green-50 hover:bg-green-100 text-green-600"
                                >
                                    Login as Test Admin
                                </button>
                            </div>

                            {/* Sign Up Link */}
                            <p className="text-center mt-4 text-gray-600">
                                New Here?{" "}
                                <Link to="/signup" className="text-purple-600 hover:underline">
                                    Create A New Account
                                </Link>
                            </p>

                            {/* Social Login */}
                            <div className="mt-6">
                                <SocialLogin />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;