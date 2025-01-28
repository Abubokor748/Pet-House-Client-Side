import { FaAd, FaCampground, FaCat, FaCoins, FaDonate, FaHome, FaList, FaMoneyBill, FaSearch, FaUser } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmins from "../Hooks/useAdmins";
import { FaMoneyBill1Wave } from 'react-icons/fa6';
import { Helmet } from "react-helmet-async";

const Dashboard = () => {

    const [isAdmin] = useAdmins();

    const menu = isAdmin ? (
        <>
            <li>
                <NavLink to="/dashboard/adminHome">
                    <FaHome></FaHome>
                    Admin Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/users">
                    <FaUser></FaUser>
                    Users
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/pets">
                    <FaList></FaList>
                    All Pets
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/all_donations">
                    <FaCoins></FaCoins>
                    All Donations
                </NavLink>
            </li>
        </>
    ) : (
        <>
            <li>
                <NavLink to="/dashboard/add_pet">
                    <FaHome></FaHome>
                    Add A Pet
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/pet_history">
                    <FaCat></FaCat>
                    My Added Pets
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/request">
                    <FaAd></FaAd>
                    Adoption Request
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/campaign">
                    <FaMoneyBill1Wave></FaMoneyBill1Wave>
                    Create Donation Campaigns
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/my_campaign">
                    <FaMoneyBill></FaMoneyBill>
                    My Donation Campaigns
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/donation">
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
                {/* dashboard sidebar */}
                <div className="w-64 min-h-screen bg-black opacity-70 text-white">
                    <ul className="menu p-4">
                        {menu}
                        <div className="divider"></div>
                        <li>
                            <NavLink to="/">
                                <FaHome></FaHome>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/pet_listing">
                                <FaSearch></FaSearch>
                                Pet List
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/donation">
                                <FaCampground></FaCampground>
                                Donation Campaign
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* dashboard content */}
                <div className="flex-1 p-8">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;