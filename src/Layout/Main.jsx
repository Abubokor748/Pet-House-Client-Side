import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <outlet></outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;