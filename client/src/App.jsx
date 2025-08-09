import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Learn from "./pages/learn"; 
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";
import Talent from "./pages/Talent";
import CategoryPage from "./pages/CategoryPage";
import DanceVideos from "./pages/DanceVideos";
import VideoCategoryPage from "./pages/VideoCategoryPage";
import PlaylistPage from "./pages/PlaylistPage";
import ForgotPassword from "./components/ForgotPassword";
import VerifiedPage from "./pages/VerifiedPage";

function App() {
  return (
    <Router>
      <div className="relative min-h-screen w-full font-poppins">
        {/* Navbar fixed at top */}
        <div className="fixed top-0 left-0 right-0 z-10">
          <Navbar />
        </div>

        {/* Page content */}
        <main className="pt-10 px-"> 
          <Routes>
            {/* Public pages */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Auth-required pages */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/learn" element={<Learn />} /> 
            <Route path="/upload" element={<Upload />} />
            <Route path="/profile/:id" element={<Profile />} />

            {/* Talent & video routes */}
            <Route path="/talent" element={<Talent />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/videos/dance" element={<DanceVideos />} />
            <Route path="/videos/:category" element={<VideoCategoryPage />} />

            {/* Playlists */}
            <Route path="/playlist" element={<PlaylistPage />} />

            {/* Password reset & verification */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verified" element={<VerifiedPage />} />

            {/* Fallback for unknown routes */}
            <Route path="*" element={<h1 className="text-center mt-10">404 - Page Not Found</h1>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
