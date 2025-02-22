import aboutUsPic from '../../../assets/aboutUs.jpg'
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const AboutUs = () => {
    return (
        <section
            className="relative bg-cover bg-center bg-no-repeat text-white py-20 my-10"
            style={{
                backgroundImage: `url(${aboutUsPic})`,
            }}
        >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="container mx-auto px-4 md:px-8 relative">
                <SectionTitle heading="About Us"></SectionTitle>
                <p className="text-lg md:text-2xl text-center max-w-2xl mx-auto">
                    Welcome to our pet adoption platform — a place where love finds a home.
                    We are dedicated to connecting animals in need with people who care.
                    Our mission is to make pet adoption simple, transparent, and meaningful
                    for everyone.
                </p>

                <p className="text-lg md:text-2xl text-center mt-4 max-w-2xl mx-auto">
                    Here, You will discover dogs, cats, rabbits, and even fish looking for
                    their forever homes. Explore their stories, find your perfect match, and
                    give a loving friend a second chance at happiness. Join us in creating
                    joyful endings, one adoption at a time.
                </p>
            </div>
        </section>
    );
};

export default AboutUs;