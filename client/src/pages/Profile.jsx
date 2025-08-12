import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/api";

const Profile = () => {
  const { id } = useParams(); // user_id from URL
  const [userInfo, setUserInfo] = useState(null);
  const [userVideos, setUserVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndVideos = async () => {
      try {
         const [userRes, videosRes] = await Promise.all([
          axios.get(`/api/users/${id}`), 
          axios.get("/api/posts/videos"), 
        ]);
        setUserInfo(userRes.data);
        setUserVideos(
          videosRes.data.filter((v) => Number(v.user_id) === Number(id))
        );
       
      } catch (err) {
        console.error("Error loading profile:", err);
        setLoading(false);
      }finally {
        setLoading(false);
      }
    };

    fetchUserAndVideos();
  }, [id]);
   if (loading) return <p className="text-center">Loading profile...</p>;

  return (
     
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">
        {userInfo?.name || "User"}'s Profile
      </h1>
      <p className="text-gray-600 mb-6">{userInfo?.email}</p>

      <h2 className="text-2xl font-semibold mb-4">Uploaded Videos</h2>
      {userVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {userVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <video
                src={video.video_url}
                controls
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{video.title}</h3>
                <p className="text-sm text-gray-500">{video.description}</p>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <p>🎵 Genre: {video.genre}</p>
                  <p>📊 Level: {video.level}</p>
                  <p>🎭 Category: {video.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No videos uploaded yet.</p>
      )}
    </div>
  );
};


export default Profile;
