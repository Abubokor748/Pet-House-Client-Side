import { FaAd, FaCampground, FaCat, FaCoins, FaDonate, FaHome, FaList, FaMoneyBill, FaSearch, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAdmins from "../Hooks/useAdmins";
import { FaMoneyBill1Wave } from 'react-icons/fa6';
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const [isAdmin] = useAdmins();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    useEffect(() => {
        if (isAdmin) {
            navigate('/dashboard/users');
        } else {
            navigate('/dashboard/add_pet');
        }
    }, [isAdmin, navigate]);

    const menu = isAdmin ? (
        <>
            <li>
                <NavLink
                    to="/dashboard/users"
                    className={({ isActive }) => isActive ? "text-blue-500" : ""}
                    onClick={closeSidebar}>
                    <FaUser></FaUser>
                    Users
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/dashboard/pets"
                    className={({ isActive }) => isActive ? "text-blue-500" : ""}
                    onClick={closeSidebar}>
                    <FaList></FaList>
                    All Pets
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/dashboard/donations"
                    className={({ isActive }) => isActive ? "text-blue-500" : ""}
                    onClick={closeSidebar}>
                    <FaCoins></FaCoins>
                    All Donations
                </NavLink>
            </li>
        </>
    ) : (
        <>
            <li>
                <NavLink
                    to="/dashboard/add_pet"
                    className={({ isActive }) => isActive ? "text-blue-500" : ""}
                    onClick={closeSidebar}>
                    <FaHome></FaHome>
                    Add A Pet
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/dashboard/myAddedPets"
                    className={({ isActive }) => isActive ? "text-blue-500" : ""}
                    onClick={closeSidebar}>
                    <FaCat></FaCat>
                    My Added Pets
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/dashboard/request"
                    className={({ isActive }) => isActive ? "text-blue-500" : ""}
                    onClick={closeSidebar}>
                    <FaAd></FaAd>
                    Adoption Request
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/dashboard/campaign"
                    className={({ isActive }) => isActive ? "text-blue-500" : ""}
                    onClick={closeSidebar}>
                    <FaMoneyBill1Wave></FaMoneyBill1Wave>
                    Create Donation Campaigns
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/dashboard/my_campaign"
                    className={({ isActive }) => isActive ? "text-blue-500" : ""}
                    onClick={closeSidebar}>
                    <FaMoneyBill></FaMoneyBill>
                    My Donation Campaigns
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/dashboard/myDonation"
                    className={({ isActive }) => isActive ? "text-blue-500" : ""}
                    onClick={closeSidebar}>
                    <FaDonate></FaDonate>
                    My Donation
                </NavLink>
            </li>
        </>
    );

    return (
        <div>
            <Helmet>
                <title>Pet House | DashBoard</title>
            </Helmet>
            <div className="flex">
                {/* Hamburger Menu for Small Devices */}
                <button
                    onClick={toggleSidebar}
                    className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-black text-white rounded"
                >
                    <FaBars className="text-2xl" />
                </button>

                {/* Dashboard Sidebar */}
                <div
                    className={`w-64 min-h-screen bg-gray-900 text-white fixed lg:relative transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-200 ease-in-out z-40`}
                >
                    {/* Cross Button Inside Sidebar */}
                    <button
                        onClick={toggleSidebar}
                        className="lg:hidden absolute top-4 right-4 p-2 text-white hover:text-blue-500"
                    >
                        <FaTimes className="text-2xl" />
                    </button>

                    <ul className="menu p-4 mt-12 lg:mt-0">
                        {menu}

                        <div className="divider"></div>

                        {/* Shared NavLinks */}
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) => isActive ? "text-blue-500" : ""}
                                onClick={closeSidebar}>
                                <FaHome></FaHome>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/pet_listing"
                                className={({ isActive }) => isActive ? "text-blue-500" : ""}
                                onClick={closeSidebar}>
                                <FaSearch></FaSearch>
                                Pet List
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/donation"
                                className={({ isActive }) => isActive ? "text-blue-500" : ""}
                                onClick={closeSidebar}>
                                <FaCampground></FaCampground>
                                Donation Campaign
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* Dashboard Content */}
                <div className="flex-1 p-8">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;