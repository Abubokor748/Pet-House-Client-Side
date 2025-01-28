import { Link } from 'react-router-dom';
import logoPic from '../../../assets/logoPicture.jpg'
import avaterPic from '../../../assets/dpForNoPic.jpg'
import useAuth from '../../../Hooks/useAuth';

const Navbar = () => {

    const { user, logOut } = useAuth();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const menu = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/pet_listing">Pet Listing</Link></li>
        <li><Link to="/donation">Donation Campaigns</Link></li>
        <li><Link to="/dashboard">DashBoard</Link></li>

        {
            user ? <>
                <li onClick={handleLogOut}><a>Log Out</a></li>
            </> : <>
                <li><Link to="/login">Login</Link></li>
            </>
        }
    </>

    return (
        <div>
            <div className="navbar max-w-screen-2xl fixed z-10 opacity-70 bg-black text-white ">
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
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-black">
                            {menu}
                        </ul>
                    </div>
                    <div className='flex items-center gap-3'>
                        <Link to="/">
                            <img src={logoPic} alt="" className='w-14 rounded-4xl' />
                        </Link>
                        <h2 className='text-2xl'>Pet House</h2>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {menu}
                    </ul>
                </div>
                <div className="flex gap-2">
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
                            className="menu menu-sm dropdown-content rounded-box bg-black z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    DashBoard
                                </a>
                            </li>
                            <li><Link to="/">Logout</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;