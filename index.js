const cookieParser = require("cookie-parser");
const { run, nosql } = require("mbfi");
const { Signup, Login, UserState, Logout } = require("./src/Auth");
const {
  createVideo,
  updateVideo,
  deleteVideo,
  getAllVideos,
  getVideoById,
} = require("./src/Vidio");
const app = run(5000, ["http://localhost:5173"]);

app.use(cookieParser());

nosql.connectDB(process.env.MANGO_URL);

app.post("/signup", Signup);
app.post("/login", Login);
app.get("/state", UserState);
app.get("/logout", Logout);

app.post("/videos", createVideo);
app.put("/videos/:id", updateVideo);
app.delete("/videos/:id", deleteVideo);
app.get("/videos", getAllVideos);
app.get("/videos/:id", getVideoById);
