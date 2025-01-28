const PetCard = ({ pet, onViewDetails }) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-2xl border-gray-700">
            <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-80 object-cover mt-2 rounded-2xl mb-2"
            />
            <h3 className="text-2xl font-bold">Pet Name: {pet.name}</h3>
            <p className="text-lg mt-2">
                <span className="font-bold">Age:</span> {pet.age} years
            </p>
            <p className="text-lg mt-2">
                <span className="font-bold">Location:</span> {pet.location}
            </p>
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-4 rounded-xl"
                onClick={onViewDetails}
            >
                View Details
            </button>
        </div>
    );
};

export default PetCard;
