import mongoose from "mongoose";

// Define Playlist schema
const playlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ""
    },
    occasion: {
      type: String,
      default: ""
    },
    song_list: {
      type: [String], 
      default: []
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

// Create Playlist model
export default mongoose.model("Playlist", playlistSchema);


