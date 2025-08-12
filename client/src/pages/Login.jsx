import React, { useState } from "react";
import axios from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

   


  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(`/api/auth/login`, form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 transition-all duration-300">
      <div className="max-w-6xl w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Section */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <img src="/logo.png" alt="Logo" className="h-10 mb-4" />
          <h2 className="text-4xl font-bold mb-2 text-gray-800 dark:text-white">
            Welcome Back to TalentHub
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Sign in to continue your creative journey with{" "}
            <span className="font-semibold text-indigo-600">TalentHub</span>.
          </p>
          <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-2">
            <li>🎵 Learn from 500+ experts</li>
            <li>🚀 Showcase your talent to the world</li>
            <li>👥 Connect with 50,000+ creators</li>
          </ul>
        </div>

        {/* Right Section (Form) */}
        <div className="md:w-1/2 bg-gray-50 dark:bg-gray-900 px-10 py-8">
          <h3 className="text-2xl font-bold text-center mb-2 text-gray-800 dark:text-white">
            Log In to Your Account
          </h3>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
            Access exclusive lessons and upload your talent
          </p>

          {error && (
            <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Email
              </label>
              <div className="flex items-center border rounded-md px-3 bg-white dark:bg-gray-800 focus-within:ring-2 focus-within:ring-indigo-400">
                <FaEnvelope className="text-gray-400 mr-2" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full py-2 outline-none bg-transparent text-black dark:text-white"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Password
              </label>
              <div className="flex items-center border rounded-md px-3 bg-white dark:bg-gray-800 focus-within:ring-2 focus-within:ring-indigo-400">
                <FaLock className="text-gray-400 mr-2" />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full py-2 outline-none bg-transparent text-black dark:text-white"
                  required
                />
              </div>
              <p className="text-right text-sm mt-1">
                <Link
                  to="/forgot-password"
                  className="text-indigo-500 hover:underline"
                >
                  Forgot Password?
                </Link>
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 mt-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg transition duration-300 shadow-md ${
                loading ? "opacity-70 cursor-not-allowed" : "hover:scale-105"
              }`}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>

            {/* Register Link */}
            <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-4">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-indigo-600 font-medium hover:underline"
              >
                Register
              </Link>
            </p>

            {/* Social Login */}
            <div className="text-center text-sm text-gray-400 mt-4">
              or continue with
            </div>

            <div className="flex justify-center gap-4 mt-3">
              <a
                href="https://accounts.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="border px-4 py-2 rounded-md text-sm hover:bg-gray-500 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700 transition text-black"
              >
                Google
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="border px-4 py-2 rounded-md text-sm hover:bg-gray-500 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700 transition text-black"
              >
                Instagram
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
