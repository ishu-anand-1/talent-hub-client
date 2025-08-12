import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { Link } from "react-router-dom";

const Talent = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    category: "All",
    genre: "All",
    level: "All",
  });

  const categories = ["All", "Dance", "Singing", "Instrument"];
  const genres = ["All", "Hip-hop", "Classical", "Jazz", "Pop"];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];
    

  // Fetch uploaded videos
  // Fetch uploaded videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`/api/videos/get-all-video`); // ✅ Updated API endpoint
        setVideos(res.data);
        setFilteredVideos(res.data);
      } catch (err) {
        console.error("Failed to fetch videos", err);
      }
    };
    fetchVideos();
  }, []);

  // Filter videos based on search + dropdowns
  useEffect(() => {
    const filtered = videos.filter((v) => {
      return (
        (filters.category === "All" || v.category === filters.category) &&
        (filters.genre === "All" || v.genre === filters.genre) &&
        (filters.level === "All" || v.level === filters.level) &&
        (v.title?.toLowerCase().includes(search.toLowerCase()) ||
          v.description?.toLowerCase().includes(search.toLowerCase()))
      );
    });
    setFilteredVideos(filtered);
  }, [search, filters, videos]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-red-100">🎭 Talent Gallery</h1>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
        <input
          type="text"
          placeholder="🔍 Search by title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-md w-full md:w-1/3 bg-white text-black"
        />

        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded-md bg-white text-black"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          name="genre"
          value={filters.genre}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded-md bg-white text-black"
        >
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <select
          name="level"
          value={filters.level}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded-md bg-white text-black"
        >
          {levels.map((lvl) => (
            <option key={lvl} value={lvl}>
              {lvl}
            </option>
          ))}
        </select>
      </div>

      {/* Video Cards */}
      {filteredVideos.length === 0 ? (
        <p className="text-center text-gray-500">No videos found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative pb-[56.25%]">
                {video.video_url.includes("youtube.com") ||
                video.video_url.includes("youtu.be") ? (
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={
                      video.video_url.includes("watch?v=")
                        ? video.video_url.replace("watch?v=", "embed/")
                        : video.video_url.replace("youtu.be/", "youtube.com/embed/")
                    }
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={video.title}
                  ></iframe>
                ) : (
                  <video
                    src={video.video_url}
                    controls
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-4 space-y-1">
                <h2 className="text-lg font-bold truncate">{video.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {video.description}
                </p>
                <p className="text-sm">🎵 Genre: {video.genre}</p>
                <p className="text-sm">📈 Level: {video.level}</p>

                {video.user_id && (
                  <Link
                    to={`/profile/${video.user_id}`}
                    className="inline-block text-indigo-600 hover:underline text-sm mt-2"
                  >
                    View Uploader Profile →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Talent;
