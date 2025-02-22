import { Helmet } from 'react-helmet-async';
import donationPic from '../../assets/donationImage.jpg';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import CampaignCard from '../../Components/CampaignCard/CampaignCard';

const DonationCampaign = () => {
    const axiosPublic = useAxiosPublic();
    const { data: campaigns = [] } = useQuery({
        queryKey: ['campaigns'],
        queryFn: async () => {
            const res = await axiosPublic.get('/campaigns');
            return res.data;
        }
    });

    return (
        <div>
            <Helmet>
                <title>Pet House | Donation Campaign</title>
            </Helmet>
            
            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center h-[500px] flex items-center justify-center text-white"
                style={{ backgroundImage: `url(${donationPic})` }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative text-center px-6 max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                        Save Pets By Donating
                    </h1>
                </div>
            </section>

            {/* Campaign Grid */}
            <section className="container mx-auto p-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {campaigns.map((campaign) => (
                        <CampaignCard 
                            key={campaign._id} 
                            campaign={campaign} 
                        />
                    ))}
                </div>
                
                {/* Empty State */}
                {campaigns.length === 0 && (
                    <div className="text-center py-12">
                        <h2 className="text-2xl font-semibold text-gray-600">
                            No active campaigns found
                        </h2>
                    </div>
                )}
            </section>
        </div>
    );
};

export default DonationCampaign;