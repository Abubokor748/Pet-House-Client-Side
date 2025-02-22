import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { FaPhone, FaMapMarkerAlt, FaPaw } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const AdoptionModal = ({ pet, onClose }) => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone || !address) {
      return Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill out all required fields!",
        timer: 2000,
        showConfirmButton: false
      });
    }

    const adoptionData = {
      petId: pet._id,
      petName: pet.name,
      petImage: pet.image,
      userName: user?.name,
      userEmail: user?.email,
      phone,
      address,
    };

    try {
      await axiosPublic.post("/adoptions", adoptionData);
      Swal.fire({
        title: "Adoption Request Sent! 🎉",
        html: `<div class="text-center">
               <p class="text-lg">We've received your request to adopt <strong>${pet.name}</strong></p>
               <div class="mt-4 w-20 h-20 mx-auto">
                 <img src="${pet.image}" class="rounded-full border-4 border-yellow-400" />
               </div>
             </div>`,
        icon: "success",
        showConfirmButton: false,
        timer: 2500
      });
      onClose();
    } catch (error) {
      console.error("Error submitting adoption request:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again.",
        timer: 2000,
        showConfirmButton: false
      });
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all animate-scaleIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-t-2xl p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-400 transition-colors"
          >
            <ImCross className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FaPaw className="text-yellow-200" />
            Adopt {pet.name}
            <FaPaw className="text-yellow-200" />
          </h2>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <img 
              src={pet.image} 
              alt={pet.name} 
              className="w-24 h-24 object-cover rounded-2xl border-4 border-purple-100"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{pet.name}</h3>
              <p className="text-gray-600">ID: {pet._id}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User Info */}
            <div className="bg-gray-200 p-4 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={user?.photoURL} 
                  alt={user?.name} 
                  className="w-12 h-12 rounded-full border-2 border-purple-500"
                />
                <div>
                  <p className="font-medium text-gray-800">{user?.displayName}</p>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FaPhone className="text-purple-600" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div>
              {/* block  */}
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-purple-600" />
                  Address
                </label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all h-24"
                  placeholder="Enter your full address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-transform duration-200"
            >
              Submit Adoption Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdoptionModal;