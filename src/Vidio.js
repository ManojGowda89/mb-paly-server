const { nosql } = require("mbfi"); 


const Video = nosql.validation("video", {
  videoName: { type: String, required: true },
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const createVideo = async (req, res) => {
    const { videoName, videoUrl, thumbnailUrl } = req.body;
  
    if (!videoName || !videoUrl || !thumbnailUrl) {
      return res.status(400).send({ message: "All fields are required" });
    }
  
    try {
      const newVideo = await Video.create({
        videoName,
        videoUrl,
        thumbnailUrl,
      });
  
      res.status(201).send({ message: "Video created successfully", video: newVideo });
    } catch (error) {
      res.status(500).send({ message: "Error creating video", error: error.message });
    }
  };
  
  const updateVideo = async (req, res) => {
    const { id } = req.params;
    const { videoName, videoUrl, thumbnailUrl } = req.body;
  
    if (!videoName || !videoUrl || !thumbnailUrl) {
      return res.status(400).send({ message: "All fields are required" });
    }
  
    try {
      const video = await Video.findOneAndUpdate(
        { _id: id },
        { videoName, videoUrl, thumbnailUrl },
        { new: true }
      );
  
      if (!video) {
        return res.status(404).send({ message: "Video not found" });
      }
  
      res.status(200).send({ message: "Video updated successfully", video });
    } catch (error) {
      res.status(500).send({ message: "Error updating video", error: error.message });
    }
  };

  
  const deleteVideo = async (req, res) => {
    const { id } = req.params;
  
    try {
      const video = await Video.deleteOne({ _id: id });
  
      if (video.deletedCount === 0) {
        return res.status(404).send({ message: "Video not found" });
      }
  
      res.status(200).send({ message: "Video deleted successfully" });
    } catch (error) {
      res.status(500).send({ message: "Error deleting video", error: error.message });
    }
  };

  
  const getAllVideos = async (req, res) => {
    try {
      const videos = await Video.find().sort({ timestamp: -1 }); // Sort by timestamp descending (latest first)
      res.status(200).send({ videos });
    } catch (error) {
      res.status(500).send({ message: "Error fetching videos", error: error.message });
    }
  };

  
  const getVideoById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const video = await Video.findOne({ _id: id });
  
      if (!video) {
        return res.status(404).send({ message: "Video not found" });
      }
  
      res.status(200).send({ video });
    } catch (error) {
      res.status(500).send({ message: "Error fetching video", error: error.message });
    }
  };

  
  module.exports={ createVideo, updateVideo, deleteVideo, getAllVideos, getVideoById}