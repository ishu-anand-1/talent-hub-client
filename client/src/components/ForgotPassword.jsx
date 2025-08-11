import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./FloatingShapes.css";

// Automatically choose API base URL depending on environment
const API_BASE_URL =
  import.meta.env.VITE_API_URL||  "http://localhost:5000"
   

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Sending OTP verification request", email, otp);
  }, [otp]);

  const handleSendOTP = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/forgot-password`, { email });
      alert(res.data.message);
      setStep(2);
    } catch (error) {
      alert(error.response?.data?.error || "Failed to send OTP");
    }
  };

  const handleVerifyOTP = async () => {
    console.log("Starting OTP verification...");
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/verify-otp`, {
        email: email.trim(),
        otp: otp.trim(),
      });

      console.log("OTP verified successfully", res.data);
      alert(res.data.message);
      setStep(3);
    } catch (error) {
      console.error("OTP verification error:", error?.response?.data || error.message);
      alert(error?.response?.data?.error || "OTP verification failed");
    } finally {
      console.log("Ending OTP verification. Turning off loading.");
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      alert("Please fill in both password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/reset-password`, {
        email,
        newPassword,
        confirmPassword,
      });

      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.error || "Password reset failed.");
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Background Layer with Floating Shapes */}
      <div className="floating-shape-bg">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      {/* The form container */}
      <div className="flex justify-center items-center min-h-screen relative z-10">
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
          {step === 1 && (
            <>
              <h2 className="text-2xl font-semibold mb-7 text-center text-black">Forgot Password</h2>
              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
              />
              <button
                className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition"
                onClick={handleSendOTP}
              >
                Send OTP
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <h2 className="text-2xl font-semibold mb-4 text-center text-black">Enter OTP</h2>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
              />
              <button
                disabled={loading}
                onClick={handleVerifyOTP}
                className={`w-full ${
                  loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
                } text-white p-2 rounded transition`}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </>
          )}
          {step === 3 && (
            <>
              <h2 className="text-2xl font-bold mb-4 text-center text-black">Create New Password</h2>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
              />
              {newPassword && confirmPassword && newPassword !== confirmPassword && (
                <p className="text-red-500 text-sm mb-2">Passwords do not match</p>
              )}
              <button
                onClick={handleResetPassword}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                disabled={loading || !newPassword || !confirmPassword || newPassword !== confirmPassword}
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
