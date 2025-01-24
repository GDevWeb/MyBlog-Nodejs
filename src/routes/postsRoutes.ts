import express from "express";
import { upload } from "../middleware/multer.js";
const router = express.Router();

import {
  createPost,
  deletePost,
  getPosts,
  getPostsById,
  updatePost,
} from "../controllers/postController.js";

const postsRoutes = () => {
  // Routes:
  // Upload image
  router.post("/test-upload", upload.single("file"), (req, res) => {
    try {
      if (req.file) {
        console.log("Uploaded File:", req.file);
        res
          .status(200)
          .json({ message: "File uploaded successfully!", file: req.file });
      } else {
        res.status(400).json({ error: "No file uploaded." });
      }
    } catch (error) {
      console.error("Error during upload test:", error);
      res.status(500).json({ error: "Failed to test upload." });
    }
  });

  // Retrieve all articles:
  router.get("/", getPosts);

  // Retrieve a specific article by id
  router.get("/post/:id", getPostsById);

  // Create an article
  router.post("/create-post", upload.single("file"), createPost);

  // Update:
  router.put("update-post/:id", upload.single("file"), updatePost);

  // Delete a specific article by id
  router.delete("/delete-post/:id", deletePost);

  return router;
};

export default postsRoutes;
