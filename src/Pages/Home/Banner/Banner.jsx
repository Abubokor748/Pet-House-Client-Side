import bannerPic from '../../../assets/banner.png'

const Banner = () => {
    return (
        <div>
            <section
                className="relative bg-cover bg-center h-[500px] flex items-center justify-center text-white opacity-95"
                style={{
                    backgroundImage: `url(${bannerPic})`,
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
                    <a
                        href="/adopt"
                        className="px-6 py-3 bg-yellow-500 text-black font-medium rounded-md shadow hover:bg-yellow-600"
                    >
                        Start Adopting
                    </a>
                </div>
            </section>

        </div>
    );
};

export default Banner;