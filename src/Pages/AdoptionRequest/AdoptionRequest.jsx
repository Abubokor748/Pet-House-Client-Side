import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { FaPaw, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";


const AdoptionRequest = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: adoptions = [], refetch } = useQuery({
        queryKey: ['myAdoptions', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/adoptions?email=${user?.email}`);
            console.log("API Response:", res.data);
            return res.data;
        },
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/adoptions/${id}`)
                    .then(() => {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your pet has been deleted.",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false,
                        });
                    });
            }
        });
    };


    return (
        <div>
            <Helmet>
                <title>Pet Dashboard | Adoption Request</title>
            </Helmet>
            <div>
                <SectionTitle heading="Adoption Request"></SectionTitle>
            </div>
            <div>
                <div className="max-w-6xl mx-auto">
                    {adoptions.length === 0 ? (
                        <div className="text-center py-12 px-4 rounded-xl bg-white shadow-lg mt-8">
                            <div className="max-w-md mx-auto">
                                <div className="text-6xl text-blue-200 mb-4 flex justify-center">
                                    <FaPaw />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                                    No Adoption Request added yet
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Start by adding your first pet Adoption request! They will appear here once you make a request.
                                </p>
                                <img
                                    src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?w=740"
                                    alt="No pets"
                                    className="w-64 mx-auto rounded-lg opacity-90"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-md overflow-hidden mt-8">
                            <table className="w-full">
                                <thead className="bg-blue-50">
                                    <tr>
                                        <th className="py-4 px-6 text-left text-blue-900 font-semibold">#</th>
                                        <th className="py-4 px-6 text-left text-blue-900 font-semibold">Image</th>
                                        <th className="py-4 px-6 text-left text-blue-900 font-semibold">Name</th>
                                        <th className="py-4 px-6 text-left text-blue-900 font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {adoptions.map((adoption, index) => (
                                        <tr key={adoption._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="py-4 px-6 font-medium text-gray-700">{index + 1}</td>
                                            <td className="py-4 px-6">
                                                <img
                                                    src={adoption.petImage}
                                                    alt={adoption.petName}
                                                    className="w-16 h-16 object-cover rounded-lg border-2 border-blue-100"
                                                />
                                            </td>
                                            <td className="py-4 px-6 font-medium text-gray-800">{adoption.petName}</td>
                                            <td className="py-4 px-6">
                                                <button
                                                    onClick={() => handleDelete(adoption._id)}
                                                    className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                                                    title="Delete pet"
                                                >
                                                    <FaTrash className="text-lg" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdoptionRequest;