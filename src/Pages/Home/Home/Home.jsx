import { Helmet } from "react-helmet-async";
import HomePets from "../../../Components/HomePets.jsx/HomePets";
import AboutUs from "../AboutUs/AboutUs";
import Banner from "../Banner/Banner";
import Review from "../Review/Review";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Pet House | Home</title>
            </Helmet>
            <Banner></Banner>
            <HomePets></HomePets>
            <AboutUs></AboutUs>
            <Review></Review>
        </div>
    );
};

export default Home;