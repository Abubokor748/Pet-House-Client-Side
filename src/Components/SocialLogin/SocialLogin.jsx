import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const SocialLogin = () => {

    const { googleSignIn } = useAuth();

    const navigate = useNavigate();

    const axiosPublic = useAxiosPublic();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user)
                const userInfo = {
                    email: result?.user?.email,
                    name: result?.user?.displayName,
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data)
                    })
                navigate('/');
            })
    }

    return (
        <div className="space-y-6 mb-6">
            {/* Divider with "Or" text */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                        Or continue with
                    </span>
                </div>
            </div>

            {/* Google Sign-In Button */}
            <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center px-6 py-3 bg-white border-2 border-purple-500 rounded-xl font-semibold text-purple-600 hover:bg-purple-50 hover:border-purple-600 hover:text-purple-700 transition-all duration-300 shadow-sm hover:shadow-md"
            >
                <FaGoogle className="w-5 h-5 mr-3 text-red-600" />
                Continue with Google
            </button>
        </div>
    );
};

export default SocialLogin;