import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import SignInAnimation from "../../assets/registration.json";
import Lottie from 'lottie-react';

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { createUser, updateUserProfile } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then((result) => {
                const loggedUser = result.user;
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            photo: data.photoURL,
                        };
                        axiosPublic.post('/users', userInfo)
                            .then((res) => {
                                if (res.data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "User Created Successfully",
                                        showConfirmButton: false,
                                        timer: 1500,
                                    });
                                    navigate('/');
                                }
                            });
                    })
                    .catch((error) => {
                        Swal.fire({
                            icon: "error",
                            title: "Sign Up Failed",
                            text: error.message,
                        });
                    });
            });
    };

    return (
        <>
            <Helmet>
                <title>Pet House | Sign Up</title>
            </Helmet>
            <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gradient-to-r from-purple-50 to-indigo-50">
                {/* animation Section */}
                <div className="w-full lg:w-1/2">
                    <Lottie
                        animationData={SignInAnimation}
                        className="max-w-md mx-auto"
                    />
                </div>

                {/* Sign Up Form Section */}
                <div className="w-full lg:w-1/2 flex justify-center p-4">
                    <div className="card bg-white shadow-2xl rounded-lg w-full max-w-md">
                        <div className="card-body p-6">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                {/* Name Input */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-gray-700">Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        {...register("name", { required: true })}
                                        placeholder="Your Name"
                                        className="input input-bordered w-full bg-gray-50"
                                    />
                                    {errors.name && <span className="text-red-600">Name is required</span>}
                                </div>

                                {/* Photo URL Input */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-gray-700">Photo URL</span>
                                    </label>
                                    <input
                                        type="text"
                                        {...register("photoURL", { required: true })}
                                        placeholder="Photo URL"
                                        className="input input-bordered w-full bg-gray-50"
                                    />
                                    {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                                </div>

                                {/* Email Input */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-gray-700">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        {...register("email", { required: true })}
                                        placeholder="Enter your email"
                                        className="input input-bordered w-full bg-gray-50"
                                    />
                                    {errors.email && <span className="text-red-600">Email is required</span>}
                                </div>

                                {/* Password Input */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-gray-700">Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        {...register("password", {
                                            required: true,
                                            minLength: 6,
                                            maxLength: 20,
                                            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                        })}
                                        placeholder="Enter your password"
                                        className="input input-bordered w-full bg-gray-50"
                                    />
                                    {errors.password?.type === "required" && (
                                        <p className="text-red-600">Password is required</p>
                                    )}
                                    {errors.password?.type === "minLength" && (
                                        <p className="text-red-600">Password must be 6 characters</p>
                                    )}
                                    {errors.password?.type === "maxLength" && (
                                        <p className="text-red-600">Password must be less than 20 characters</p>
                                    )}
                                    {errors.password?.type === "pattern" && (
                                        <p className="text-red-600">Password must include one uppercase, one lowercase, one number, and one special character</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div className="form-control mt-6">
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-full bg-purple-600 hover:bg-purple-700 text-white"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </form>

                            {/* Login Link */}
                            <p className="text-center mt-4 text-gray-600">
                                Already Have an Account?{" "}
                                <Link to="/login" className="text-purple-600 hover:underline">
                                    Login
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

export default SignUp;