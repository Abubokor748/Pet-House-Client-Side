
const SectionTitle = ({heading}) => {
    return (
        <div>
            <h2 className="text-center mb-10">
                <span className="inline-block bg-pink-100 text-pink-800 text-3xl font-bold px-8 py-3 rounded-full border-2 border-pink-300 shadow-lg hover:scale-105 transition-transform">
                    {heading}
                </span>
            </h2>
        </div>
    );
};

export default SectionTitle;