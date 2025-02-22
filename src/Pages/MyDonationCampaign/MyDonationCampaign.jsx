import { useQuery } from "@tanstack/react-query";
import { FaPaw, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const MyDonationCampaign = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: campaigns = [], refetch } = useQuery({
        queryKey: ['myCampaigns', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/campaigns?email=${user?.email}`);
            console.log("API Response:", res.data);
            return res.data;
        },
    })

    // Handle delete pet
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/campaigns/${id}`)
                    .then((res) => {
                        if (res?.data?.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your pet has been deleted.",
                                icon: "success",
                            });
                        }
                    });
            }
        });
    };

    return (
        <div>
            <Helmet>
                <title>Pet Dashboard | My Pets</title>
            </Helmet>
            <div>
                <SectionTitle heading="My Donation Campaign"></SectionTitle>
            </div>
            <div className="p-4">
                {campaigns.length === 0 ? (
                    <div className="text-center py-12 px-4 rounded-xl bg-white shadow-lg mt-8">
                        <div className="max-w-md mx-auto">
                            <div className="text-6xl text-blue-200 mb-4 flex justify-center">
                                <FaPaw />
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                                No Donation Campaign Made Yet
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Start by making your first Donation for Pet request! They will appear here once you make a Campaign.
                            </p>
                            <img
                                src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?w=740"
                                alt="No pets"
                                className="w-64 mx-auto rounded-lg opacity-90"
                            />
                        </div>
                    </div>) : (
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            {/* Table Head */}
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Total</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            {/* Table Body */}
                            <tbody>
                                {
                                    campaigns.map((campaign, index) => (
                                        <tr key={campaign._id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <img
                                                    src={campaign.image}
                                                    className="w-12 h-12 object-cover rounded"
                                                />
                                            </td>
                                            <td>{campaign.currentDonation} / {campaign.maxDonation}</td>
                                            <td>
                                                <div className="gap-2">
                                                    {/* Delete Button */}
                                                    <button
                                                        onClick={() => handleDelete(campaign._id)}
                                                        className="btn btn-sm btn-error text-white"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>)}
            </div>
        </div>
    );
};

export default MyDonationCampaign;