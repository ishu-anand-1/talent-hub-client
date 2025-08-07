import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Music2 } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle"; // ✅ Import the toggle button

function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 top-0">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Music2 className="text-indigo-600" />
        <h1 className="text-2xl font-extrabold text-indigo-600">TalentHub</h1>
      </div>

      {/* Navigation Links */}
      <ul className="flex gap-6 font-medium">
        {[
          { label: "Home", to: "/" },
          { label: "Learn", to: "/learn" },
          { label: "Upload", to: "/upload" },
          { label: "Talent", to: "/talent" },
          { label: "Login", to: "/login" },
        ].map(({ label, to }) => (
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

      {/* Dark Mode Button */}
      <div className="flex items-center">
        <DarkModeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
