import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { createUser, updateUserProfile } = useAuth();

    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const onSubmit = (data) => {
        // console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            photo: data.photoURL
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to db')
                                    reset();
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "User Created successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
    }

    return (
        <>
            <Helmet>
                <title>Pet House | Sign Up</title>
            </Helmet>
            <div>
                <div className="hero bg-base-200 min-h-screen">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="text-center lg:text-left">
                            <h1 className="text-5xl font-bold">Sign UP now!</h1>
                            <p className="py-6">
                            Join our community of pet lovers! Create an account to connect with other owners, share tips and experiences, and find the perfect home for your furry friend.
                            </p>
                        </div>
                        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" {...register("name", { required: true })} placeholder="Your Name" className="input input-bordered" />
                                    {errors.name && <span className='text-red-600'>Name is required</span>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo URL</span>
                                    </label>
                                    <input type="text" {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                                    {errors.photoURL && <span className='text-red-600'>Photo URL is required</span>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                                    {errors.email && <span className='text-red-600'>Name is required</span>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                    })} placeholder="password" className="input input-bordered" />
                                    {errors.password?.type === "required" && (
                                        <p className='text-red-600'>Password is required</p>
                                    )}
                                    {errors.password?.type === "minLength" && (
                                        <p className='text-red-600'>Password must be 6 characters</p>
                                    )}
                                    {errors.password?.type === "maxLength" && (
                                        <p className='text-red-600'>Password must be less then 20 characters</p>
                                    )}
                                    {errors.password?.type === "pattern" && (
                                        <p className='text-red-600'>Password must one uppercase, one lowercase, one number and one special character</p>
                                    )}
                                </div>

                                <div className="form-control mt-6">
                                    <input type="submit" value="Sign Up" className="btn btn-primary w-full " />
                                </div>
                            </form>
                            <p className='text-xl text-center mb-3'><small>Already Have an Account? <Link className='underline' to="/login"> Login</Link> </small></p>
                            <div className='px-8'>
                                <SocialLogin></SocialLogin>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;