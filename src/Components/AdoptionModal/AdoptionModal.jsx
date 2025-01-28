import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const AdoptionModal = ({ pet, onClose }) => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone || !address) return alert("Please fill out all required fields.");

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
      const response = await axiosPublic.post("/adoptions", adoptionData);
      Swal.fire({
        title: `${user.name} Pet Adoption Request has been Sent!`,
        icon: "success",
        draggable: true
      });
      onClose();
    } catch (error) {
      console.error("Error submitting adoption request:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="bg-black text-white p-8 rounded-xl shadow-2xl w-96">
        <h2 className="text-2xl font-bold mb-4">Adopt {pet.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <div>
              <p className="font-bold mb-2">Pet Information:</p>
              <div className="mb-4">
                <p>Pet ID: {pet._id}</p>
                <p>Pet Name: {pet.name}</p>
              </div>
            </div>
            <div>
              <img src={pet.image} alt="" className="rounded-2xl" />
            </div>
          </div>

          <p className="font-bold mb-2">User Information:</p>
          <input
            type="text"
            className="border p-2 w-full rounded-md mb-2"
            value={user?.name || ""}
            disabled
          />
          <input
            type="email"
            className="border p-2 w-full rounded-md mb-2"
            value={user?.email || ""}
            disabled
          />

          <input
            type="text"
            className="border p-2 w-full rounded-md mb-2"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="text"
            className="border p-2 w-full rounded-md mb-2"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 mt-4 rounded-xl w-full"
          >
            Submit Adoption Request
          </button>
        </form>

        <button className="mt-4 text-red-500 underline w-full" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AdoptionModal;