import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/api"; // your axios setup


const VideoCategoryPage = () => {
  const { category } = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`/api/videos/category/${category}`);
        setVideos(res.data);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };

    fetchVideos();
  }, [category]);

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 capitalize">{category} Videos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${extractYouTubeID(video.video_url)}`}
                title={video.title}
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{video.title}</h2>
              <p className="text-sm text-gray-500">{video.author}</p>
              <p className="text-xs text-gray-400 mt-1">{video.genre} • {video.level}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Extract YouTube Video ID from full URL
const extractYouTubeID = (url) => {
  const match = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/);
  return match ? match[1] : "";
};

export default VideoCategoryPage;
