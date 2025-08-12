import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../services/api";

// Base API URL from .env (e.g. VITE_API_URL=https://your-backend.com)


const genres = ["all", "hip-hop", "classical", "jazz", "pop"];
const levels = ["all", "beginner", "intermediate", "advanced"];

const Learn = () => {
  const [videos, setVideos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [genre, setGenre] = useState("all");
  const [level, setLevel] = useState("all");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const [modalVideo, setModalVideo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data } = await api.get("/api/videos/get-all-video");
        console.log("Videos from server:", data);

        const normalized = data.map((video) => ({
          ...video,
          genre: video.genre?.toLowerCase() || "",
          level: video.level?.toLowerCase() || "",
          tags: video.tags?.toLowerCase() || "",
          title: video.title || "",
        }));

        setVideos(normalized);
        setFiltered(normalized);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    let result = [...videos];

    if (genre !== "all") {
      result = result.filter((v) => v.genre === genre);
    }

    if (level !== "all") {
      result = result.filter((v) => v.level === level);
    }

    if (search.trim()) {
      const s = search.toLowerCase();
      result = result.filter(
        (v) =>
          v.title?.toLowerCase().includes(s) ||
          v.tags?.toLowerCase().includes(s)
      );
    }

    setFiltered(result);
  }, [genre, level, search, videos]);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 6);
  const openModal = (video) => setModalVideo(video);
  const closeModal = () => setModalVideo(null);

  return (
    <div className="relative p-12 min-h-screen bg-transparent text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-red-100">🎓 Learn Videos</h1>

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by title or tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded bg-white border text-gray-700 shadow-sm focus:outline-none w-64"
        />
        <select
          className="px-4 py-2 rounded bg-white border text-gray-700 shadow-sm focus:outline-none"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          {genres.map((g) => (
            <option key={g} value={g}>
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </option>
          ))}
        </select>
        <select
          className="px-4 py-2 rounded bg-white border text-gray-700 shadow-sm focus:outline-none"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          {levels.map((l) => (
            <option key={l} value={l}>
              {l.charAt(0).toUpperCase() + l.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Video Cards */}
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-red-500">No videos found for selected filters.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.slice(0, visibleCount).map((video) => (
              <div
                key={video._id}
                className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl shadow-lg p-4 transform transition hover:-translate-y-1 hover:scale-105 duration-300 cursor-pointer"
                onClick={() => openModal(video)}
              >
                <div className="relative pb-[56.25%] rounded overflow-hidden shadow-inner">
                  {video.video_url?.includes("youtube.com") ? (
                    <iframe
                      src={video.video_url.replace("watch?v=", "embed/")}
                      className="absolute top-0 left-0 w-full h-full rounded"
                      allowFullScreen
                      title={video.title}
                    />
                  ) : (
                    <video
                      src={video.video_url}
                      controls
                      className="absolute top-0 left-0 w-full h-full object-cover rounded"
                    />
                  )}
                </div>
                <div className="mt-4 space-y-1">
                  <h2 className="text-lg font-bold truncate">{video.title}</h2>
                  <p className="text-sm opacity-90 line-clamp-2">{video.description}</p>
                  <div className="flex justify-between text-xs mt-2">
                    <span className="bg-white text-indigo-600 px-2 py-1 rounded-md">
                      {video.genre || "N/A"}
                    </span>
                    <span className="bg-white text-purple-600 px-2 py-1 rounded-md">
                      {video.level || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          {visibleCount < filtered.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 shadow-md"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}

      {/* Video Modal */}
      {modalVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg max-w-3xl w-full overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative pb-[56.25%]">
              {modalVideo.video_url?.includes("youtube.com") ? (
                <iframe
                  src={modalVideo.video_url.replace("watch?v=", "embed/")}
                  className="absolute top-0 left-0 w-full h-full"
                  allowFullScreen
                  title={modalVideo.title}
                />
              ) : (
                <video
                  src={modalVideo.video_url}
                  controls
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              )}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold">{modalVideo.title}</h2>
              <p className="text-sm text-gray-600">{modalVideo.description}</p>
              <div className="flex gap-2 mt-3">
                <span className="text-sm text-indigo-700">
                  🎵 Genre: {modalVideo.genre}
                </span>
                <span className="text-sm text-purple-700">
                  📈 Level: {modalVideo.level}
                </span>
              </div>
              <button
                onClick={closeModal}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Learn;
