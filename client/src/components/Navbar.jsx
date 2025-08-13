import React, { useState } from "react";
import {Link, useLocation,useNavigate} from "react-router-dom";
import { Music2, Menu, X } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;
  const navigate = useNavigate();
  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Learn", to: "/learn" },
    { label: "Upload", to: "/upload" },
    { label: "Talent", to: "/talent" },
    { label: "Login", to: "/login" },
  ];

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 top-0 relative z-50">
      
      
      <div className="flex items-center gap-2">
        <button onClick={()=>navigate("/")} className="flex items-center gap-2 hover:opacity-80 transition">
        <Music2 className="text-indigo-600 w-6 h-6" />
        <h1 className="text-2xl font-extrabold text-indigo-600">TalentHub</h1>
        </button>
      
      </div>
       
      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-6 font-medium">
        {navLinks.map(({ label, to }) => (
          <li key={to}>
            <Link
              to={to}
              className={`hover:text-indigo-500 transition-colors duration-200 ${
                isActive(to)
                  ? "text-indigo-600 font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Hamburger Toggle - Mobile */}
      <button
        className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Dark Mode Button */}
      <div className="hidden md:flex items-center">
        <DarkModeToggle />
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-md md:hidden">
          <ul className="flex flex-col gap-4 p-4 font-medium">
            {navLinks.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={`block w-full hover:text-indigo-500 transition-colors duration-200 ${
                    isActive(to)
                      ? "text-indigo-600 font-semibold"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <DarkModeToggle />
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
