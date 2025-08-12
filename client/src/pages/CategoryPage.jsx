import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api"; 

export default function CategoryPage() {
  const { category } = useParams();
  const [items, setItems] = useState([]);
  const [playingIndex, setPlayingIndex] = useState(null);


  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/api/posts/videos`, {
          withCredentials: true, // if cookies/session needed
        });

        if (category === "Playlist") {
          setItems(res.data.filter((v) => v.category === "Playlist"));
        } else {
          setItems(res.data.filter((v) => v.category === category));
        }
      } catch (err) {
        console.error("Failed to fetch:", err);
      }
    };

    fetchData();
  }, [category]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">{category} Gallery</h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-500">No {category} found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={item._id || item.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-all duration-300"
              onClick={() => category === "Playlist" && setPlayingIndex(i)}
            >
              {/* Playlist Rendering */}
              {category === "Playlist" ? (
                <>
                  <img
                    src={
                      item.image ||
                      `https://source.unsplash.com/random/400x300?music&sig=${i}`
                    }
                    alt="song thumbnail"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-bold truncate">{item.title}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {item.description}
                    </p>
                    {playingIndex === i && (
                      <audio
                        src={item.video_url}
                        controls
                        autoPlay
                        className="w-full mt-2"
                      />
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="relative pb-[56.25%]">
                    {item.video_url?.includes("youtube.com") ? (
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={item.video_url.replace("watch?v=", "embed/")}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={item.title}
                      ></iframe>
                    ) : (
                      <video
                        src={item.video_url}
                        controls
                        className="absolute top-0 left-0 w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-bold">{item.title}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {item.description}
                    </p>
                    <p className="text-sm">🎵 Genre: {item.genre}</p>
                    <p className="text-sm">📈 Level: {item.level}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
