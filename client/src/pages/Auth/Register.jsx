import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "role" ? Number(value) : value,
    });
    setError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const res = await api.post("/user/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role || 2,
      });

      localStorage.setItem("token", res.data.user.token);
      login(res.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image / Gradient */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#2F8F4A] to-[#256f3a] items-center justify-center p-10">
        <div className="text-white max-w-md text-center">
          <h1 className="text-4xl font-bold mb-4">Join Our Platform</h1>
          <p className="text-lg opacity-90">
            Experience a modern FarmYatri system that’s fast, efficient, and easy to use.
          </p>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg2mpgWDwmddlqTPJRZ9KGYcud0Kiy1xbRFA&s"
            alt="Farm illustration"
            className="mt-8 max-w-xs mx-auto"
          />
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center bg-[#F7FBF6] p-6">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="bg-[#2F8F4A] rounded-full p-3 shadow-md">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M3 7l9-4 9 4-9 4-9-4z" />
                <path d="M3 17l9 4 9-4" />
                <path d="M3 12l9 4 9-4" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-[#2F8F4A] mb-4">
            Create Your Account
          </h2>

          {/* Error Message */}
          {error && (
            <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
          )}

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2F8F4A] outline-none"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2F8F4A] outline-none"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2F8F4A] outline-none"
              required
            />
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2F8F4A] outline-none"
              required
            />

            <select
              name="role"
              placeholder="Select Role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2F8F4A] outline-none"
              required
            >
              <option value="">Select Role</option>
              <option value="3">Buyer</option>
              <option value="2">Farmer</option>
            </select>

            <button
              type="submit"
              className="w-full bg-[#2F8F4A] hover:bg-[#256f3a] text-white py-2 rounded-lg font-semibold transition"
            >
              Register
            </button>
          </form>

          {/* Login Link */}
          <p className="text-sm text-center text-[#5B6B57] mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-[#2F8F4A] hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
