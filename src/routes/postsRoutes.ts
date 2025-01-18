import express, { NextFunction, Request, Response } from "express";
const router = express.Router();

import {
  createPost,
  deletePost,
  getPosts,
  getPostsById,
  updatePost,
} from "../controllers/postController.js";

const postsRoutes = () => {
  // middleware:
  router.use("/", (req: Request, res: Response, next: NextFunction) => {
    console.log(`Posts routes requested : ${req.originalUrl}`);
    next();
  });

  // Routes:
  // Retrieve all articles:
  router.get("/", getPosts);

  // Retrieve a specific article by id
  router.get("/post/:id", getPostsById);

  // Create an article
  router.post("/create-post", createPost);

  // Update a specific article by id
  router.put("/update-post/:id", updatePost);

  // Delete a specific article by id
  router.delete("/delete-post/:id", deletePost);

  return router;
};

export default postsRoutes;
