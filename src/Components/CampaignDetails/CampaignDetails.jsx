import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../SectionTitle/SectionTitle';


const CampaignDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    // Fetch current campaign
    const { data: campaign = {}, isLoading } = useQuery({
        queryKey: ['campaign', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/campaigns/${id}`);
            return res.data;
        }
    });

    if (isLoading) return <div className="text-center py-12">Loading...</div>;

    return (
        <div>
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <br />
                <br />
                <br />
                <br />
            <Helmet>
                <title>Pet House | Pet Donation</title>
            </Helmet>
            <div>
                <SectionTitle heading="Pet Donation"></SectionTitle>
            </div>
                <div className="relative h-54  text-white">
                    <img
                        src={campaign.image}
                        alt={campaign.name}
                        className="h-full mx-auto"
                    />

                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Donation Section */}
                        <div className="md:col-span-2">
                            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                                <h2 className="text-3xl font-bold mb-6">Support This Cause</h2>

                                {/* Progress Bar */}
                                <div className="mb-6">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-lg font-semibold">
                                            ${campaign.currentDonation} raised of ${campaign.maxDonation}
                                        </span>
                                        <span className="text-lg font-semibold text-blue-600">
                                            {((campaign.currentDonation / campaign.maxDonation) * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                        <div
                                            className="bg-blue-600 h-4 rounded-full"
                                            style={{
                                                width: `${(campaign.currentDonation / campaign.maxDonation * 100).toFixed(1)}%`
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                <button

                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-xl rounded-xl transition-all"
                                >
                                    Donate Now
                                </button>
                            </div>
                            {/* Campaign Details */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="text-2xl font-bold mb-4">About This Campaign</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {campaign.longDescription}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignDetails;