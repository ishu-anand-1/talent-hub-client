import React, { useEffect, useState } from "react";
import axios from "../services/api";

const PlaylistPage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const res = await axios.get("/api/videos/category/Playlist");
        setVideos(res.data);
      } catch (err) {
        console.error("Error fetching playlist:", err);
      }
    };
    fetchPlaylist();
  }, []);

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Music Playlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl p-4 shadow-lg text-white">
            <div className="relative pb-[56.25%] mb-4">
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-xl"
                src={`https://www.youtube.com/embed/${extractYouTubeID('https://www.youtube.com/watch?v=BznVOBWIvWY&list=RDBznVOBWIvWY&start_radio=1')}`}
                allow="autoplay; encrypted-media"
                title={video.title}
                allowFullScreen
              ></iframe>
            </div>
            <h2 className="text-lg font-semibold">{video.title}</h2>
            <p className="text-sm">{video.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const extractYouTubeID = (url) => {
  const match = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/);
  return match ? match[1] : "";
};

export default PlaylistPage;
