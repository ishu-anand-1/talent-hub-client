import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import playlistRoutes from './routes/playlistRoutes.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


connectDB();


const allowedOrigins = [
  'http://localhost:5173',
  'https://talent-hub-client.vercel.app',
  'https://talent-hub-client-1.onrender.com'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Allow requests without origin (e.g., curl, mobile apps)

    const isAllowed =
      allowedOrigins.includes(origin) ||
      /\.vercel\.app$/.test(origin); 

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/playlists', playlistRoutes);

// ✅ Health Check Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ✅ Handle 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.message);
  if (err.message.includes('CORS')) {
    return res.status(403).json({ error: 'CORS policy does not allow access from this origin.' });
  }
  res.status(500).json({ error: 'Server error' });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
