import listingBannerPic1 from '../../../src/assets/Pet-Shops-Banner2.png';

const PetListingBanner = () => {
    return (
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
            <img
                src={listingBannerPic1}
                alt="Pet Listing Banner"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-60 flex items-center justify-center">
                <div className="text-center text-white px-4 sm:px-6 max-w-2xl">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Find Your New Best Friend
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl mb-6">
                        Discover pets in need of loving homes. Make a difference today.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PetListingBanner;