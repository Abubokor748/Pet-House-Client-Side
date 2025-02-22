import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const AllDonations = () => {
    return (
        <div>
            <Helmet>
                <title>Pet Admin | All Donations</title>
            </Helmet>
            <div className="flex justify-evenly my-4">
                <SectionTitle heading="All Donations"></SectionTitle>
            </div>
            <div>
                <h2>This is all donation page</h2>
            </div>
        </div>
    );
};

export default AllDonations;