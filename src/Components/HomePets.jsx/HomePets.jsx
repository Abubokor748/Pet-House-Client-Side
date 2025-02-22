import usePets from "../../Hooks/usePets";
import SectionTitle from "../SectionTitle/SectionTitle";

const HomePets = () => {
    const [pets, loading] = usePets();

    if (loading) return
    <div className='flex items-center justify-center h-screen'>
        <span className="loading loading-spinner loading-xl "></span>
    </div>

    return (
        <div className="my-10">
            <div className="mx-auto text-center">
                <SectionTitle heading="🐶 Featured Pets 🐱"></SectionTitle>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-3 p-3">
                {pets.slice(0, 6).map((pet) => (
                    <div key={pet._id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl border border-gray-300">
                        <img src={pet.image} alt={pet.name} className="w-full h-80 object-cover mt-2 rounded-2xl mb-2" />
                        <h3 className="text-2xl font-bold text-gray-700">Pet Name: {pet.name}</h3>
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
