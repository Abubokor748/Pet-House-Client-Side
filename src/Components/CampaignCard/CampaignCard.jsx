import { Link } from "react-router-dom";

const CampaignCard = ({ campaign }) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-2xl border-gray-700">
            <img
                src={campaign.image}
                className="w-full h-80 object-cover mt-2 rounded-2xl mb-2"
            />
            <h3 className="text-2xl font-bold">Short Description: {campaign.shortDescription}</h3>
            <p className="text-lg mt-2">
                <span className="font-bold">createdAt:</span> {campaign.createdAt} years
            </p>
            <p className="text-lg mt-2">
                <span className="font-bold">maxDonation:</span> {campaign.maxDonation}
            </p>

            <Link to={`/campaign_details/${campaign._id}`}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-4 rounded-xl"
                >
                    View Details
                </button>
            </Link>
        </div>
    );
};

export default CampaignCard;