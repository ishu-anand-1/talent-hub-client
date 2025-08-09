import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: String,
    category: { type: String, required: true },
    genre: { type: String, required: true },
    level: { type: String, required: true },
    video_url: { type: String, required: true },
    thumbnail_url: {type: String },
    views: { type: Number,default: 0},
    isPublic: { type: Boolean,default: true},
    
  },
  { timestamps: true }
);
videoSchema.index({ category: 1, genre: 1, level: 1 });
export default mongoose.model("Video", videoSchema);
