import React, { useState } from "react";
import api from "../../utils/api";
import { useAuth } from "../../context/AuthContext";

const EditProfile = ({ profile = {}, onProfileUpdated, onCancel }) => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: profile.username || "",
        email: profile.email || "",
        password: "",
        gender: profile.gender ?? 0,
        phone: profile.phone || "",
        address: {
            street: profile.address?.street || "",
            city: profile.address?.city || "",
            state: profile.address?.state || "",
            pincode: profile.address?.pincode || "",
        },
        farmDetails: {
            farmName: profile.farmDetails?.farmName || "",
            farmSize: profile.farmDetails?.farmSize || "",
            cropTypes: profile.farmDetails?.cropTypes?.join(", ") || "",
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes("address.")) {
            const field = name.split(".")[1];
            setFormData((prev) => ({
                ...prev,
                address: { ...prev.address, [field]: value },
            }));
        } else if (name.includes("farmDetails.")) {
            const field = name.split(".")[1];
            setFormData((prev) => ({
                ...prev,
                farmDetails: { ...prev.farmDetails, [field]: value },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            farmDetails: {
                ...formData.farmDetails,
                cropTypes: formData.farmDetails.cropTypes
                    .split(",")
                    .map((c) => c.trim()),
            },
        };

        try {
            const response = await api.post("/user/edit-profile", payload, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            if (response.data.status) {
                onProfileUpdated?.(response.data.data);
            } else {
                alert(response.data.message || "Failed to update profile");
            }
        } catch (error) {
            alert("Error updating profile");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full border px-3 py-2 rounded"
            />
            <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border px-3 py-2 rounded"
            />
            <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="New Password"
                className="w-full border px-3 py-2 rounded"
            />
            <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
            >
                <option value={0}>Male</option>
                <option value={1}>Female</option>
                <option value={2}>Other</option>
            </select>
            <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full border px-3 py-2 rounded"
            />
            <input
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                placeholder="Street"
                className="w-full border px-3 py-2 rounded"
            />
            <input
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full border px-3 py-2 rounded"
            />
            <input
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
                placeholder="State"
                className="w-full border px-3 py-2 rounded"
            />
            <input
                name="address.pincode"
                value={formData.address.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                className="w-full border px-3 py-2 rounded"
            />
            <input
                name="farmDetails.farmName"
                value={formData.farmDetails.farmName}
                onChange={handleChange}
                placeholder="Farm Name"
                className="w-full border px-3 py-2 rounded"
            />
            <input
                name="farmDetails.farmSize"
                type="number"
                value={formData.farmDetails.farmSize}
                onChange={handleChange}
                placeholder="Farm Size"
                className="w-full border px-3 py-2 rounded"
            />
            <input
                name="farmDetails.cropTypes"
                value={formData.farmDetails.cropTypes}
                onChange={handleChange}
                placeholder="Crop Types (comma separated)"
                className="w-full border px-3 py-2 rounded"
            />
            <div className="flex gap-4">
                <button
                    type="submit"
                    className="px-4 py-2 bg-[#2F8F4A] text-white rounded"
                >
                    Update
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-300 rounded"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default EditProfile;
