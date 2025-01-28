import usePets from "../../Hooks/usePets";

const HomePets = () => {
    const [pets, loading] = usePets();

    if (loading) return
    <div className='flex items-center justify-center h-screen'>
        <span className="loading loading-spinner loading-xl "></span>
    </div>

    return (
        <div>
            <div>
                <h2 className='text-center text-3xl my-5 py-5 underline'>Featured Pets</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-3 p-3">
                {pets.slice(0, 6).map((pet) => (
                    <div key={pet._id} className="bg-white p-4 rounded-xl shadow-2xl border-gray-700">
                        <img src={pet.image} alt={pet.name} className="w-full h-80 object-cover mt-2 rounded-2xl mb-2" />
                        <h3 className="text-2xl font-bold">Pet Name: {pet.name}</h3>
                        <p className="text-lg mt-2"><span className='font-bold'>Pet Description: </span>{pet.description}</p>

                        <div className='flex gap-15'>
                            <p className="text-lg mt-2"><span className='font-bold'>Category: </span>{pet.category}</p>
                            <p className="text-lg mt-2"><span className='font-bold'>Breed: </span>{pet.breed}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePets;
