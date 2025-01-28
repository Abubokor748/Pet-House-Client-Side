import {
    createBrowserRouter,
} from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import PetListing from "../Pages/PetListing/PetListing";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import DonationCampaign from "../Pages/DonationCampaign/DonationCampaign";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/DashBoard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/pet_listing',
                element: <PetListing></PetListing>,
            },
            {
                path: '/login',
                element: <Login></Login>,
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>,
            },
            {
                path: '/donation',
                element: <DonationCampaign></DonationCampaign>,
            },
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // normal user routes
            // {
            //     path: 'userHome',
            //     element: <UserHome></UserHome>
            // },
        ]
    }

]);
