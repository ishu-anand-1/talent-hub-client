import { useState, useEffect } from "react";
import axios from "../services/api";


const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("dance");
  const [url, setUrl] = useState("");
  const [genre, setGenre] = useState("Hip-Hop");
  const [level, setLevel] = useState("Beginner");
  const [videos, setVideos] = useState([]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/posts/upload`, {
        title,
        category,
        video_url: url,
        genre,
        level,
      });
      alert("Uploaded successfully");
      setTitle("");
      setUrl("");
      setGenre("Hip-Hop");
      setLevel("Beginner");
      fetchVideos();
    } catch (err) {
      alert(err.response?.data?.error || "Upload failed");
    }
  };

  const fetchVideos = async () => {
    try {
      const res = await axios.get(`/api/posts/videos`);
      setVideos(res.data);
    } catch (err) {
      console.error("Fetch failed");
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 text-black dark:text-white transition-all duration-300">
      <h2 className="text-2xl font-bold mb-4 text-red-100">Upload Performance</h2>
      <form onSubmit={handleUpload} className="flex flex-col gap-4 mb-10">
        <input
          type="text"
          placeholder="Title"
          className="border p-2 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className="border p-2 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="dance">Dance</option>
          <option value="singing">Singing</option>
          <option value="instrument">Instrument</option>
        </select>
        <select
          className="border p-2 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option>Hip-Hop</option>
          <option>Jazz</option>
          <option>Classical</option>
          <option>Pop</option>
          <option>Rock</option>
        </select>
        <select
          className="border p-2 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
        <input
          type="text"
          placeholder="Video URL"
          className="border p-2 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors"
        >
          Upload
        </button>
      </form>

      <h3 className="text-xl font-bold mb-2 text-red-100">Your Videos</h3>
      <div className="grid gap-4">
        {videos.map((v) => (
          <div
            key={v.id}
            className="border p-4 rounded bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-700 shadow transition"
          >
            <h4 className="font-semibold">{v.title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">Category: {v.category}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Genre: {v.genre}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Level: {v.level}</p>
            <video className="w-full mt-2 rounded" controls src={v.video_url}></video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard; 