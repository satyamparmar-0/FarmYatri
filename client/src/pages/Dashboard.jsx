import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [profile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("profile"); // for menu navigation

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

  // Content for each tab - placeholder content, you can replace with real data/components
  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="max-w-md">
            <div className="flex items-center gap-4 mb-6">
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
            <div className="space-y-2 text-gray-700">
              <p><strong>Role:</strong> {profile.role || "User"}</p>
              <p><strong>Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        );
      case "sales":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Sales Today</h2>
            <p>View today's sales summary and statistics.</p>
          </div>
        );
      case "orders":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Open Orders</h2>
            <p>Manage and track your open orders here.</p>
          </div>
        );
      case "listing":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Create/Edit Listing</h2>
            <p>Add or modify your produce listings.</p>
          </div>
        );
      case "kyc":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">KYC</h2>
            <p>Complete or review your KYC verification status.</p>
          </div>
        );
      case "payouts":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Payouts</h2>
            <p>View payout history and manage your payment details.</p>
          </div>
        );
      case "queue":
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Orders Queue</h2>
            <p>Queue of incoming orders waiting for your action.</p>
          </div>
        );
      default:
        return <p>Select a menu item to get started.</p>;
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F7FBF6] font-[Inter] text-[#213528]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#E6EDE4] flex flex-col">
        <div className="px-6 py-6 border-b border-[#E6EDE4] flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#2F8F4A]">FarmYatri</h1>
          {/* <button
            onClick={logout}
            className="text-sm px-3 py-1 bg-[#2F8F4A] text-white rounded hover:bg-[#256f3a] transition"
          >
            Logout
          </button> */}
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {[
            { id: "profile", label: "Profile" },
            { id: "sales", label: "Sales Today" },
            { id: "orders", label: "Open Orders" },
            { id: "listing", label: "Create/Edit Listing" },
            { id: "kyc", label: "KYC" },
            { id: "payouts", label: "Payouts" },
            { id: "queue", label: "Orders Queue" },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full text-left px-4 py-2 rounded-md font-semibold hover:bg-[#2F8F4A] hover:text-white transition
                ${activeTab === id ? "bg-[#2F8F4A] text-white" : "text-[#5B6B57]"}`}
            >
              {label}
            </button>
          ))}
        </nav>
        {/* Logout at bottom */}
      <div className="px-4 py-6 border-t border-[#E6EDE4]">
        <button
          onClick={logout}
          className="w-full text-left px-4 py-2 rounded-md font-semibold text-[#5B6B57] hover:bg-red-100 hover:text-red-600 transition"
        >
          Logout
        </button>
      </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 max-w-4xl mx-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
