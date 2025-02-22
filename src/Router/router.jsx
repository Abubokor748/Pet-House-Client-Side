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
import PetDetails from "../Pages/PetDetails/PetDetails";
import AddAPet from "../Pages/AddAPet/AddAPet";
import AllUsers from "../Pages/AllUsers/AllUsers";
import MyAddedPets from "../Pages/MyAddedPets/MyAddedPets";
import AdoptionRequest from "../Pages/AdoptionRequest/AdoptionRequest";
import AllPets from "../Pages/AllPets/AllPets";
import CreateCampaign from "../Pages/CreateCampaign/CreateCampaign";
import AllDonations from "../Pages/AllDonations/AllDonations";
import MyDonationCampaign from "../Pages/MyDonationCampaign/MyDonationCampaign";
import CampaignDetails from "../Components/CampaignDetails/CampaignDetails";


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
            {
                path: '/pet_details/:id',
                element: <PetDetails></PetDetails>,
            },
            {
                path: '/campaign_details/:id',
                element: <CampaignDetails></CampaignDetails>,
            },
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // normal user routes
            {
                path: 'add_pet',
                element: <AddAPet></AddAPet>,
            },
            {
                path: 'myAddedPets',
                element: <MyAddedPets></MyAddedPets>,
            },
            {
                path: 'request',
                element: <AdoptionRequest></AdoptionRequest>,
            },
            {
                path: 'campaign',
                element: <CreateCampaign></CreateCampaign>,
            },
            {
                path: 'my_campaign',
                element: <MyDonationCampaign></MyDonationCampaign>,
            },

            // admin only route
            {
                path: 'users',
                element: <AllUsers></AllUsers>,
            },
            {
                path: 'pets',
                element: <AllPets></AllPets>,
            },
            {
                path: 'donations',
                element: <AllDonations></AllDonations>,
            },
        ]
    }

]);
