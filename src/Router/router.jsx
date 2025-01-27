import {
    createBrowserRouter,
} from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";

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
        ]
    },
    
]);
