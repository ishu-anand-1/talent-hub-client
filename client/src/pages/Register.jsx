import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import axios from "../services/api"; // or use 'axios' directly if no api.js


const Register = () => {
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
   const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("/api/auth/register", form);
    console.log("Registered:", res.data);
    alert("Registration successful!");
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    alert(error.response?.data?.error || "Registration failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-6xl w-full mx-4 bg-white dark:bg-gray-900 shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="md:w-1/2 bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold mb-4">
            Your Creative Journey Starts Here
          </h2>
          <p className="mb-6">
            Join thousands of artists who are learning, sharing, and getting discovered on <strong>TalentHub</strong>.
          </p>
          <ul className="space-y-2 text-sm">
            <li>🎵 Access to 500+ expert tutorials</li>
            <li>👥 Join a community of 50,000+ learners</li>
            <li>✨ Get personalized recommendations</li>
          </ul>
        </div>

        {/* Right Section (Form) */}
        <div className="md:w-1/2 bg-gray-50 dark:bg-gray-800 px-10 py-8">
          <h3 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            Welcome to TalentHub
          </h3>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
            Sign in to your account or create a new one
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  First Name
                </label>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md px-3 bg-white dark:bg-gray-700">
                  <FaUser className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    name="name"
                    placeholder="John"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full py-2 outline-none bg-transparent text-black dark:text-white"
                    required
                  />
                </div>
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Last Name
                </label>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md px-3 bg-white dark:bg-gray-700">
                  <FaUser className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Doe"
                    value={form.lastname}
                    onChange={handleChange}
                    className="w-full py-2 outline-none bg-transparent text-black dark:text-white"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md px-3 bg-white dark:bg-gray-700">
                <FaEnvelope className="text-gray-400 mr-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full py-2 outline-none bg-transparent text-black dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md px-3 bg-white dark:bg-gray-700">
                <FaLock className="text-gray-400 mr-2" />
                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full py-2 outline-none bg-transparent text-black dark:text-white"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-2 rounded-lg mt-4 transition duration-300"
            >
              Create Account
            </button>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 font-medium hover:underline">
                Sign In
              </Link>
            </p>

            <div className="mt-4 text-center text-sm text-gray-400">or continue with</div>
            <div className="flex justify-center gap-4 mt-2">
              <button
                type="button"
                className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md text-sm hover:bg-gray-700 dark:hover:bg-gray-700 transition text-black"
              >
                Google
              </button>
              <button
                type="button"
                className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md text-sm hover:bg-gray-700 dark:hover:bg-gray-700 transition text-black"
              >
                Facebook
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
