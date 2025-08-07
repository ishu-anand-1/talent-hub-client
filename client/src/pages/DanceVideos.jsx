import React, { useEffect, useState } from "react";
import axios from "../services/api"; // Make sure this points to your axios config

const DanceVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDanceVideos = async () => {
      try {
        const res = await axios.get("/videos/category/Dance"); // your backend API
        console.log("✅ Response from backend:", res.data);
        setVideos(res.data);
      } catch (err) {
        console.error("❌ Error fetching dance videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDanceVideos();
  }, []);

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-pink-600">
        💃 Dance Videos Showcase
      </h1>

      {!loading && (
        <div className="text-sm text-center text-yellow-400 mb-4">
          🔍 Fetched {videos.length} video{videos.length !== 1 ? "s" : ""}
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-400">Loading videos...</p>
      ) : videos.filter((v) => v.category.toLowerCase() === "dance").length === 0 ? (
        <p className="text-center text-gray-500">No dance videos found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {videos
            .filter((video) => video.category.toLowerCase() === "dance")
            .map((video) => (
              <div
                key={video.id}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:scale-105"
              >
                <div className="relative pb-[56.25%]">
                  {video.video_url.includes("youtube.com") ? (
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={video.video_url.replace("watch?v=", "embed/")}
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
                <div className="p-4">
                  <h2 className="text-lg font-bold truncate text-pink-700">
                    {video.title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {video.description}
                  </p>
                  <p className="text-sm text-gray-600">Genre: {video.genre}</p>
                  <p className="text-sm text-gray-600">Level: {video.level}</p>
                  <p className="text-xs italic text-gray-400 mt-2">
                    Uploaded by: {video.author}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default DanceVideos;
