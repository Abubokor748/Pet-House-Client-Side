import { useParams } from "react-router-dom";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { FaPaw, FaHeart, FaMapMarkerAlt, FaClock, FaDog } from "react-icons/fa";
import { useState } from "react";
import AdoptionModal from "../../Components/AdoptionModal/AdoptionModal";
import PrivateRoute from "../../Router/PrivateRoute";

const fetchPet = async (id, axiosPublic) => {
    const response = await axiosPublic.get(`/pets/${id}`);
    return response.data;
};

const PetDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const [showAdoptionModal, setShowAdoptionModal] = useState(false);

    const {
        data: pet,
        isLoading,
        error
    } = useQuery({
        queryKey: ['pet', id],
        queryFn: () => fetchPet(id, axiosPublic)
    });

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex items-center justify-center h-screen">
            <p className="text-red-500">Error loading testimonials: {error.message}</p>
        </div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <br />
            <br />
            <br />
            <br />
            <SectionTitle heading="Meet Your New Friend" />

            <div className="max-w-7xl mx-auto px-4">
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

                    {/* Main Content */}
                    <div className="grid md:grid-cols-2 gap-8 p-8">
                        {/* Image Gallery */}
                        <div className="space-y-4">
                            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
                                <img
                                    src={pet.image}
                                    alt={pet.name}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                                />
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="space-y-6">
                            {/* Header */}
                            <div className="border-b pb-6">
                                <h1 className="text-4xl font-bold flex items-center gap-3">
                                    <FaPaw className="text-primary" />
                                    {pet.name}
                                </h1>
                                <div className="flex items-center gap-2 mt-2 text-gray-600">
                                    <FaMapMarkerAlt />
                                    <span>{pet.location}</span>
                                </div>
                            </div>

                            {/* Quick Info Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <div className="flex items-center gap-2">
                                        <FaClock className="text-primary" />
                                        <span className="font-medium">Age</span>
                                    </div>
                                    <p className="text-xl mt-1">{pet.age} years</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <div className="flex items-center gap-2">
                                        <FaDog className="text-primary" />
                                        <span className="font-medium">Breed</span>
                                    </div>
                                    <p className="text-xl mt-1">{pet.breed}</p>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-4">
                                <h3 className="text-2xl font-semibold">About {pet.name}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {pet.description}
                                </p>
                            </div>

                            {/* Additional Details */}
                            <div className="bg-primary/10 p-6 rounded-xl space-y-4">
                                <h4 className="text-xl font-semibold">Quick Facts</h4>
                                <ul className="space-y-2">
                                    <li className="flex justify-between">
                                        <span className="text-gray-600">Vaccination Status</span>
                                        <span className="font-medium">
                                            {pet.vaccinated ? 'Up to Date' : 'Not Vaccinated'}
                                        </span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="text-gray-600">Adoption Fee</span>
                                        <span className="font-medium">${pet.adoptionFee}</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="text-gray-600">Temperament</span>
                                        <span className="font-medium">{pet.temperament}</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-4">
                                <button
                                    className="btn btn-primary btn-lg w-full hover:scale-105 transition-transform"
                                    onClick={() => setShowAdoptionModal(true)}
                                >
                                    <FaHeart className="mr-2" />
                                    Start Adoption Process
                                </button>
                                {showAdoptionModal && (<PrivateRoute>
                                    <AdoptionModal
                                        pet={pet}
                                        onClose={() => setShowAdoptionModal(false)}
                                    />
                                </PrivateRoute>
                                )}
                                <button className="btn btn-outline btn-lg w-full">
                                    Ask About {pet.name}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PetDetails;