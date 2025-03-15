import { Link, NavLink } from 'react-router-dom';
import logoPic from '../../../assets/logoPicture.jpg'
import avaterPic from '../../../assets/dpForNoPic.jpg'
import useAuth from '../../../Hooks/useAuth';

const Navbar = () => {

    const { user, logOut } = useAuth();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch((error) => console.log(error));
    }

    const menu = <>
        <li>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `hover:text-blue-500 transition duration-300 text-xl ${isActive ? 'text-blue-500' : 'text-white'}`
                }
            >
                Home
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/pet_listing"
                className={({ isActive }) =>
                    `hover:text-blue-500 transition duration-300 text-xl ${isActive ? 'text-blue-500' : 'text-white'}`}>
                Pet Listing
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/donation"
                className={({ isActive }) =>
                    `hover:text-blue-500 transition duration-300 text-xl ${isActive ? 'text-blue-500' : 'text-white'}`}>
                Donation Campaign
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                    `hover:text-blue-500 transition duration-300 text-xl ${isActive ? 'text-blue-500' : 'text-white'}`}>
                Dashboard
            </NavLink>
        </li>

        {
            user ? <>
                <li>
                    <Link onClick={handleLogOut} className="hover:text-blue-500 transition  duration-300 text-xl">
                        Log Out
                    </Link>
                </li>
            </> : <>
                <li>
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            `hover:text-blue-500 transition duration-300 text-xl ${isActive ? 'text-blue-500' : 'text-white'}`}>
                        Login
                    </NavLink>
                </li>
            </>
        }
    </>

    return (
        <div>
            <div className="navbar fixed z-10  bg-gradient-to-r from-black to-gray-600 shadow-lg text-white">

                {/* navbar start */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-gradient-to-r from-black to-gray-800 rounded-box w-52 text-white">
                            {menu}
                        </ul>
                    </div>
                    <div className='flex items-center gap-3'>
                        <Link to="/">
                            <img src={logoPic} alt="" className='w-14 rounded-full' />
                        </Link>
                        <h2 className='md:text-2xl italic text-white'>Pet House</h2>
                    </div>
                </div>

                {/* navbar center */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {menu}
                    </ul>
                </div>

                {/* navbar end */}
                <div className="navbar-end flex gap-2 mr-5">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt={avaterPic}
                                    src={user?.photoURL} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-gradient-to-r from-black to-gray-600 rounded-box w-52 text-white">
                            <li>
                                {
                                    user ? <>
                                        <div>
                                            <Link to="/dashboard" className="justify-between hover:text-blue-500 transition duration-300 text-xl">DashBoard
                                            </Link>
                                        </div>
                                    </> : <>
                                        <div>
                                            <Link to="/login" className='hover:text-blue-500 transition duration-300 text-xl'>
                                                DashBoard
                                            </Link>
                                        </div>
                                    </>
                                }
                            </li>
                            <li>
                                {
                                    user ? <>
                                        <div>
                                            <Link className='hover:text-blue-500 transition duration-300 text-xl' onClick={handleLogOut}>
                                                Log Out
                                            </Link>
                                        </div>
                                    </> : <>
                                        <div>
                                            <Link to="/login" className='hover:text-blue-500 transition duration-300 text-xl'>
                                                Login
                                            </Link>
                                        </div>
                                    </>
                                }
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Navbar;