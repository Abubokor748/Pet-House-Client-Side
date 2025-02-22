import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';

const CreateCampaign = () => {
    const { user } = useAuth();
    const [imageUrl, setImageUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    // ImgBB API key and endpoint
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    // Form validation schema
    const validationSchema = Yup.object({
        maxDonation: Yup.number()
            .required('Maximum donation is required')
            .positive('Must be a positive number'),
        lastDate: Yup.date()
            .required('Last date is required')
            .min(new Date(), 'Last date must be in the future'),
        shortDescription: Yup.string()
            .required('Short description is required')
            .max(100, 'Maximum 100 characters'),
        longDescription: Yup.string()
            .required('Long description is required')
    });

    // Handle image upload to imgBB
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axiosPublic.post(image_hosting_api, formData);
            setImageUrl(response.data.data.url);
            toast.success('Image uploaded successfully!');
        } catch (error) {
            toast.error('Image upload failed');
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    // Formik setup
    const formik = useFormik({
        initialValues: {
            maxDonation: '',
            lastDate: '',
            shortDescription: '',
            longDescription: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            if (!imageUrl) {
                toast.error('Please upload an image first');
                return;
            }

            const campaignData = {
                ...values,
                image: imageUrl,
                createdBy: user.email,
                createdAt: new Date().toISOString(),
                currentDonation: 0,
                donations: []
            };

            try {
                const response = await axiosSecure.post('/campaigns', campaignData);
                if (response.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `$Campaign has been added!`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    formik.resetForm();
                    setImageUrl('');
                }
            } catch (error) {
                toast.error('Failed to create campaign');
                console.error(error);
            }
        }
    });

    return (
        <div>
            <Helmet>
                <title>Pet Dashboard | All Users</title>
            </Helmet>
            <div className="flex justify-evenly my-4">
                <SectionTitle heading="Create Donation Campaign"></SectionTitle>
            </div>
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md ">
                <form onSubmit={formik.handleSubmit}>
                    {/* Image Upload */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            Pet Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={isUploading}
                            className="w-full p-2 border rounded"
                        />
                        {isUploading && <p className="text-sm text-gray-500">Uploading...</p>}
                        {imageUrl && (
                            <img
                                src={imageUrl}
                                alt="Campaign Preview"
                                className="mt-2 w-32 h-32 object-cover rounded"
                            />
                        )}
                    </div>

                    {/* Maximum Donation */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            Maximum Donation Amount ($)
                        </label>
                        <input
                            type="number"
                            name="maxDonation"
                            value={formik.values.maxDonation}
                            onChange={formik.handleChange}
                            className="w-full p-2 border rounded"
                        />
                        {formik.errors.maxDonation && (
                            <p className="text-sm text-red-500">
                                {formik.errors.maxDonation}
                            </p>
                        )}
                    </div>

                    {/* Last Date */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            Last Date of Donation
                        </label>
                        <input
                            type="date"
                            name="lastDate"
                            value={formik.values.lastDate}
                            onChange={formik.handleChange}
                            className="w-full p-2 border rounded"
                        />
                        {formik.errors.lastDate && (
                            <p className="text-sm text-red-500">
                                {formik.errors.lastDate}
                            </p>
                        )}
                    </div>

                    {/* Short Description */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            Short Description
                        </label>
                        <input
                            type="text"
                            name="shortDescription"
                            value={formik.values.shortDescription}
                            onChange={formik.handleChange}
                            className="w-full p-2 border rounded"
                        />
                        {formik.errors.shortDescription && (
                            <p className="text-sm text-red-500">
                                {formik.errors.shortDescription}
                            </p>
                        )}
                    </div>

                    {/* Long Description */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            Long Description
                        </label>
                        <textarea
                            name="longDescription"
                            value={formik.values.longDescription}
                            onChange={formik.handleChange}
                            className="w-full p-2 border rounded"
                            rows="4"
                        />
                        {formik.errors.longDescription && (
                            <p className="text-sm text-red-500">
                                {formik.errors.longDescription}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isUploading || !imageUrl}
                        className="w-full bg-blue-500 text-white py-2 rounded hover:scale-105 hover:bg-blue-600 disabled:bg-gray-400"
                    >
                        Create Campaign
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateCampaign;