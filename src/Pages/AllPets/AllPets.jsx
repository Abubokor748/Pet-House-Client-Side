import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import usePets from "../../Hooks/usePets";

const AllPets = () => {
    const [pets, loading, refetch] = usePets();
    const axiosSecure = useAxiosSecure();

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
            if (result?.isConfirmed) {
                axiosSecure.delete(`/pets/${id}`)
                    .then((res) => {
                        if (res.data?.result?.deletedCount > 0) {
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


    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <Helmet>
                <title>Pet Admin | All Pets</title>
            </Helmet>
            <div className="flex justify-evenly my-4">
                <SectionTitle heading="My Added Pets"></SectionTitle>
                <SectionTitle heading={`Total Pets: ${pets.length}`}></SectionTitle>
            </div>
            <div className="p-4">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* Table Head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody>
                            {
                                pets.map((pet, index) => (
                                    <tr key={pet._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <img
                                                src={pet.image}
                                                alt={pet.name}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                        </td>
                                        <td>{pet.name}</td>
                                        <td>
                                            <div className="gap-2">
                                                {/* Delete Button */}
                                                <button
                                                    onClick={() => handleDelete(pet._id)}
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
                </div>
            </div>
        </div>
    );
};

export default AllPets;