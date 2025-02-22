import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const AddAPet = () => {
    const { user } = useAuth();
    const [isUploading, setIsUploading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    // ImgBB API key and endpoint
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    // Categories for the dropdown
    const categories = [
        { value: "dog", label: "Dog" },
        { value: "cat", label: "Cat" },
        { value: "rabbit", label: "Rabbit" },
        { value: "fish", label: "Fish" },
    ];

    // Form validation schema
    const validationSchema = Yup.object({
        name: Yup.string().required("Pet name is required"),
        age: Yup.number()
            .required("Pet age is required")
            .positive("Age must be positive"),
        category: Yup.object().required("Category is required"),
        location: Yup.string().required("Location is required"),
        description: Yup.string().required("Description is required"),
        breed: Yup.string().required("Breed is required"),
        gender: Yup.string().required("Gender is required"),
        vaccinated: Yup.boolean().required("Vaccination status is required"),
        adoptionFee: Yup.number()
            .required("Adoption fee is required")
            .positive("Fee must be positive"),
        temperament: Yup.string().required("Temperament is required"),
        image: Yup.mixed().required("Image is required"),
    });

    // Formik setup
    const formik = useFormik({
        initialValues: {
            name: "",
            age: "",
            category: null,
            location: "",
            description: "",
            breed: "",
            gender: "",
            vaccinated: false,
            adoptionFee: "",
            temperament: "",
            image: null,
        },
        validationSchema,
        onSubmit: async (data) => {
            setIsUploading(true);

            try {
                const imageFile = { image: data.image[0] };
                const imgbbResponse = await axiosPublic.post(image_hosting_api, imageFile, {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                });

                if (imgbbResponse.data.success) {
                    const petData = {
                        ...data,
                        category: data.category.value,
                        image: imgbbResponse.data.data.display_url,
                        email: user.email,
                        addedAt: new Date().toISOString(),
                        adopted: false,
                    };

                    const petResponse = await axiosSecure.post("/pets", petData);

                    if (petResponse.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${data.name} has been added!`,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        formik.resetForm();
                    }
                } else {
                    toast.error("Failed to upload image. Please try again.");
                }
            } catch (error) {
                console.error("Error:", error);
                toast.error("Failed to add pet. Please try again.");
            } finally {
                setIsUploading(false);
            }
        },
    });

    return (
        <div>
            <Helmet>
                <title>Pet Dashboard | Add A Pet</title>
            </Helmet>
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <SectionTitle heading="Add a Pet"></SectionTitle>
                <form onSubmit={formik.handleSubmit}>
                    {/* Image Upload */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Pet Image</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={(e) => formik.setFieldValue("image", e.target.files)}
                            className="w-full p-2 border rounded"
                        />
                        {formik.errors.image && (
                            <p className="text-sm text-red-500">{formik.errors.image}</p>
                        )}
                    </div>

                    {/* Pet Name */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Pet Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            className="w-full p-2 border rounded"
                        />
                        {formik.errors.name && (
                            <p className="text-sm text-red-500">{formik.errors.name}</p>
                        )}
                    </div>

                    {/* Pet Age */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Pet Age</label>
                        <input
                            type="number"
                            name="age"
                            value={formik.values.age}
                            onChange={formik.handleChange}
                            className="w-full p-2 border rounded"
                        />
                        {formik.errors.age && (
                            <p className="text-sm text-red-500">{formik.errors.age}</p>
                        )}
                    </div>

                    {/* Category Dropdown */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <Select
                            options={categories}
                            value={formik.values.category}
                            onChange={(selected) =>
                                formik.setFieldValue("category", selected)
                            }
                            className="w-full"
                        />
                        {formik.errors.category && (
                            <p className="text-sm text-red-500">{formik.errors.category}</p>
                        )}
                    </div>

                    {/* Location */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            className="w-full p-2 border rounded"
                        />
                        {formik.errors.location && (
                            <p className="text-sm text-red-500">{formik.errors.location}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            Description
                        </label>
                        <input
                            type="text"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            className="w-full p-2 border rounded"
                        />
                        {formik.errors.description && (
                            <p className="text-sm text-red-500">
                                {formik.errors.description}
                            </p>
                        )}
                    </div>

                    {/* Breed */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Breed</label>
                        <input
                            type="text"
                            name="breed"
                            value={formik.values.breed}
                            onChange={formik.handleChange}
                            className="w-full p-2 border rounded"
                        />
                        {formik.errors.breed && (
                            <p className="text-sm text-red-500">{formik.errors.breed}</p>
                        )}
                    </div>

                    {/* Gender */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Gender</label>
                        <select
                            name="gender"
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        {formik.errors.gender && (
                            <p className="text-sm text-red-500">{formik.errors.gender}</p>
                        )}
                    </div>

                    {/* Vaccinated */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Vaccinated</label>
                        <input
                            type="checkbox"
                            name="vaccinated"
                            checked={formik.values.vaccinated}
                            onChange={formik.handleChange}
                            className="mr-2"
                        />
                        {formik.errors.vaccinated && (
                            <p className="text-sm text-red-500">{formik.errors.vaccinated}</p>
                        )}
                    </div>

                    {/* Adoption Fee */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Adoption Fee</label>
                        <input
                            type="number"
                            name="adoptionFee"
                            value={formik.values.adoptionFee}
                            onChange={formik.handleChange}
                            className="w-full p-2 border rounded"
                        />
                        {formik.errors.adoptionFee && (
                            <p className="text-sm text-red-500">{formik.errors.adoptionFee}</p>
                        )}
                    </div>

                    {/* Temperament */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Temperament</label>
                        <input
                            type="text"
                            name="temperament"
                            value={formik.values.temperament}
                            onChange={formik.handleChange}
                            className="w-full p-2 border rounded"
                        />
                        {formik.errors.temperament && (
                            <p className="text-sm text-red-500">{formik.errors.temperament}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isUploading}
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 hover:scale-105 transition-transform"
                    >
                        {isUploading ? "Adding Pet..." : "Add Pet"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddAPet;