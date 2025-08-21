import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/user/login", form);
      login(res.data.user);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F7FBF6]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        {/* Logo / Title */}
        <div className="flex flex-col items-center mb-6">
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
          <h2 className="text-2xl font-bold text-[#2F8F4A] mt-3">
            FarmYatri
          </h2>
        </div>

        {/* Heading */}
        <h3 className="text-xl font-semibold text-center mb-4 text-[#2F8F4A]">
          LOGIN
        </h3>

        {/* Error Message */}
        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#213528] mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F8F4A]"
              placeholder="email@example.com"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#213528] mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2F8F4A]"
              placeholder="••••••••"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a
              href="#"
              className="text-sm text-[#2F8F4A] hover:underline transition"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#2F8F4A] text-white py-2 rounded-lg font-semibold hover:bg-[#256f3a] transition"
          >
            Log in
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-sm text-center text-[#5B6B57] mt-6">
          Don't have an account?{" "}
          <a href="/register" className="text-[#2F8F4A] hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
