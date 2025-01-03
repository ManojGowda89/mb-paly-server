const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("mb64-connect")
require("dotenv").config()
const { Signup, Login, UserState, Logout } = require("./src/Auth");
const {
  createVideo,
  updateVideo,
  deleteVideo,
  getAllVideos,
  getVideoById,
} = require("./src/Vidio");

const app = express();
const PORT = 5000;

// Middleware
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://mb-play.onrender.com",
    "https://play.manojgowda.in"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"], // Optionally specify allowed methods
  credentials: true, // If you need to allow credentials (cookies, HTTP authentication)
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json()); // To parse JSON request bodies

// MongoDB Connection
connectDB(process.env.MANGO_URL)
// Routes
app.post("/signup", Signup);
app.post("/login", Login);
app.get("/state", UserState);
app.get("/logout", Logout);

app.post("/videos", createVideo);
app.put("/videos/:id", updateVideo);
app.delete("/videos/:id", deleteVideo);
app.get("/videos", getAllVideos);
app.get("/videos/:id", getVideoById);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
