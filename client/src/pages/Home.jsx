import React from "react";
import { Link } from "react-router-dom";
import { Upload } from "lucide-react";
import CardGrid from "../components/CardGrid";


const Home = () => {
  return (
    <div className="bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-950  min-h-screen font-poppins transition-all duration-300 rounded-2xl">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <div className="mb-4 inline-block px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full shadow-lg">
          Join 50,000+ Creative Artists
        </div>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-green-600 dark:from-blue-300 dark:to-green-200 mb-6">
          Learn. Showcase. Get Hired.
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Master dance, music, and instruments with expert instructors. Upload your
          performances and get discovered by industry professionals.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/learn">
             <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-xl shadow-lg hover:scale-105 transition transform">
            ▶ Start Learning
            </button>
          </Link>
          <Link to="/upload">
          <button className="px-6 py-3 border border-blue-500 text-blue-600 dark:text-white dark:border-gray-400 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 transition">
            ↷ Upload Your Talent
          </button>
          </Link>
        </div>
      </section>



      <CardGrid/>








      {/* Categories */}
      <section className="py-16 bg-white dark:bg-gray-900 text-center transition">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-white">Popular Categories</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-10">Explore our most loved learning paths</p>
        <div className="flex flex-wrap justify-center gap-8 px-4">
          {/* Category Cards */}
          {[
            {
              icon: "🎶",
              title: "Dance",
              desc: "Hip-hop, Ballet, Contemporary & more",
              tag: "200+ tutorials",
            },
            {
              icon: "🎤",
              title: "Singing",
              desc: "Vocal techniques, Pop, Jazz, Classical",
              tag: "150+ lessons",
            },
            {
              icon: "🎸",
              title: "Instruments",
              desc: "Guitar, Piano, Drums, Violin & more",
              tag: "300+ courses",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg dark:shadow-xl w-72 hover:shadow-xl dark:hover:shadow-2xl transition"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{item.title}</h3>
              <p className="text-gray-500 dark:text-gray-300 mb-2">{item.desc}</p>
              <span className="inline-block px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full">
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-center text-white">
        <h2 className="text-3xl font-semibold mb-4">Ready to Start Your Journey?</h2>
        <p className="mb-6">Join thousands of artists who’ve turned passion into profession</p>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:scale-105 transition">
            Get Started Free
          </button>
          <button className="px-6 py-3 bg-indigo-700 text-white rounded-lg shadow hover:bg-indigo-800 transition">
            Learn More
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;