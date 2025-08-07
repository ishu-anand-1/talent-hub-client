 import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BackgroundCarousel from "./components/BackgroundCarousel";
import CardGrid from "./components/CardGrid";
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

//import RippleCursor from "./components/RippleCursor";
//import FluidCanvas from "./components/FluidCanvas";
function App() {
  return (
    
    <Router>
      
      <div className="relative min-h-screen w-full font-poppins ">
        {/* Ripple effect cursor */}
       {/* <RippleCursor maxSize={40} duration={900} blur={true} />*/}
       
        {/* Background carousel layer */}
        
        
         
        {/* Foreground content */}
        <div className="absolute top-0 left-0 right-0 z-0">
          <div className="fixed top-0 left-0 right-0 z-10">
          <Navbar />
          </div>
          <main className="pt-10 px-">
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/learn" element={<Learn />} /> 
              <Route path="/upload" element={<Upload />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/talent" element={<Talent />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/videos/dance" element={<DanceVideos />} />
              <Route path="/videos/:category" element={<VideoCategoryPage />} />
              <Route path="/playlist" element={<PlaylistPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
               <Route path="/verified" element={<VerifiedPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;