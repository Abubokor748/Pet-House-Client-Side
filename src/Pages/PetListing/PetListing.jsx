import { useState } from "react";
import PetListingBanner from "../../Components/PetListingBanner/PetListingBanner";
import PetCard from "../../Components/PetCard/PetCard";
import usePets from "../../Hooks/usePets";
import AdoptionModal from "../../Components/AdoptionModal/AdoptionModal";
import PrivateRoute from "../../Router/PrivateRoute";
import { Helmet } from "react-helmet-async";

const PetListing = () => {
    const [pets, loading] = usePets();
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [selectedPet, setSelectedPet] = useState(null); // Modal data

    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handleCategoryChange = (e) => setCategoryFilter(e.target.value);

    const filteredPets = pets
        .filter((pet) =>
            pet.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (!categoryFilter || pet.category === categoryFilter)
        )
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Assuming createdAt exists

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span className="loading loading-spinner loading-xl "></span>
            </div>
        );
    }

    return (
        <div>
            <Helmet>
                <title>Pet House | Pet Listing</title>
            </Helmet>
            <PetListingBanner />
            <h2 className="text-center text-3xl my-5 py-5 underline">All the Pets</h2>

            <div className="flex justify-between items-center px-4 mb-5">
                <input
                    type="text"
                    placeholder="Search by pet name..."
                    className="border p-2 rounded-md w-1/2"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <select
                    className="border p-2 rounded-md"
                    value={categoryFilter}
                    onChange={handleCategoryChange}
                >
                    <option value="">All Categories</option>
                    <option value="Cat">Cat</option>
                    <option value="Dog">Dog</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Fish">Fish</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-3 p-3">
                {filteredPets.map((pet) => (
                    <PetCard key={pet._id} pet={pet} onViewDetails={() => setSelectedPet(pet)} />
                ))}
            </div>

            {/* Adoption Modal */}
            {selectedPet && (<PrivateRoute>
                <AdoptionModal
                    pet={selectedPet}
                    onClose={() => setSelectedPet(null)}
                /></PrivateRoute>
            )}
        </div>
    );
};

export default PetListing;
