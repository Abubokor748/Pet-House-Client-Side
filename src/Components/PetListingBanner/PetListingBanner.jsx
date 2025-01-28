import listingBannerPic from '../../assets/petListing.jpg'

const PetListingBanner = () => {
    return (
        <div>
            <section
                className="relative bg-cover bg-center h-[500px] flex items-center justify-center text-white opacity-95"
                style={{
                    backgroundImage: `url(${listingBannerPic})`,
                  }}
            >
                <div className="absolute"></div>
                <div className="relative text-center text-white px-6 max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Find Your New Best Friend
                    </h1>
                    <p className="text-lg md:text-xl mb-6">
                        Discover pets in need of loving homes. Make a difference today.
                    </p>                    
                </div>
            </section>

        </div>
    );
};

export default PetListingBanner;