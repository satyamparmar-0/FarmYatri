import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [profile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.post(
          "/user/user-profile",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (response.data.status) {
          setUserProfile(response.data.data);
        } else {
          setError(response.data.message || "Failed to fetch user profile");
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("An error occurred while fetching user profile");
      }
    };

    if (user?.token) {
      fetchProfile();
    }
  }, [user]);

  if (!user)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Please login to view profile.
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error: {error}
      </div>
    );

  if (!profile)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading profile...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">My Dashboard</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-[#2F8F4A] hover:bg-blue-600 text-white rounded shadow transition"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center py-10 px-4">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-6 border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-[#2F8F4A] text-white flex items-center justify-center text-2xl font-bold">
              {profile.username[0]?.toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Hi, {profile.username}
              </h2>
              <p className="text-gray-500">{profile.email}</p>
            </div>
          </div>
          <hr className="my-4" />
          <div className="space-y-2">
            <p className="text-gray-700">
              <strong>Role:</strong> {profile.role || "User"}
            </p>
            <p className="text-gray-700">
              <strong>Joined:</strong>{" "}
              {new Date(profile.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
