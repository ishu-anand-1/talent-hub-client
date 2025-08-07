const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const videoRoutes = require('./routes/videoRoutes');
const postRoutes = require('./routes/postRoutes');
const playlistRoutes = require("./routes/playlistRoutes");
const authRoutes = require('./routes/authRoutes');
const multer = require('multer');
const path = require('path');
const db = require("./config/db"); 
const cookieParser =require("cookie-parser")

const storage= multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage :storage });

dotenv.config();

const app = express();


// CORS config
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));

app.use(cors({
  origin: "http://localhost:5173", // ✅ Only allow your frontend origin
  credentials: true,              // ✅ Allow cookies/sessions
}));
app.use(cookieParser());

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.status(200).json({
    message: 'File uploaded successfully',
    file: req.file
  });
});
// Test route
app.get("/ping", (req, res) => {
  res.send("pong");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/playlists", playlistRoutes);
// app.use("/api/videos", require("./routes/videoRoutes"));

// Check DB connection and start server
const PORT = process.env.PORT || 5000;
db.getConnection()
  .then(() => {
    console.log("✅ Connected to MySQL database");
    app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MySQL connection failed:", err);
    process.exit(1);
  });
