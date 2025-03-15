import { Helmet } from 'react-helmet-async';
import donationPic1 from '../../assets/donation-page2.png';
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
        <div className=''>
            <Helmet>
                <title>Pet House | Donation Campaign</title>
            </Helmet>
            
            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center h-[500px] flex items-center justify-center text-white"
                style={{ backgroundImage: `url(${donationPic1})` }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
            </section>

            {/* Campaign Grid */}
            <section className="container mx-auto p-4 py-8 max-w-screen-2xl">
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