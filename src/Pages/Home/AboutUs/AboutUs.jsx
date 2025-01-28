import aboutUsPic from '../../../assets/aboutUs.jpg'

const AboutUs = () => {
    return (
        <section
            className="relative bg-cover bg-center bg-no-repeat text-white py-20 my-10"
            style={{
                backgroundImage: `url(${aboutUsPic})`,
            }}
        >
            <div className="container mx-auto px-4 md:px-8">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
                    About Us
                </h1>
                <p className="text-lg md:text-xl text-center">
                    Welcome to our pet adoption platform — a place where love finds a home.
                    We are dedicated to connecting animals in need with people who care.
                    Our mission is to make pet adoption simple, transparent, and meaningful
                    for everyone.
                </p>

                <p className="text-lg md:text-xl text-center mt-4">
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