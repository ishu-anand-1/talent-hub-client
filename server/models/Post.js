import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  genre: { type: String, required: true },
  level: { type: String, required: true },
  video_url: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Post", postSchema);
