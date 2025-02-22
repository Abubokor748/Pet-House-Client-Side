import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="flex flex-col p-6 border item-center justify-center h-screen">
            <h2 className="mx-auto mt-5 text-5xl">What are You looking for?</h2>
            <p className="mx-auto mt-5 text-xl">Return to home</p>
            <Link to="/" className="mx-auto btn mt-5 bg-blue-600 text-white">Home</Link>
        </div>
    );
};

export default ErrorPage;