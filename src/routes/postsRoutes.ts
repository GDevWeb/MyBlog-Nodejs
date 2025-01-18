import express, { NextFunction, Request, Response } from "express";
const router = express.Router();

import { getPosts, getPostsById } from "../controllers/postController.js";

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

  // Update a specific article by id
  router.put("/post/:id", (req: Request, res: Response) => {
    const articleId = req.params.id;
    res.send(`Update a specific article by its ID: ${articleId}`);
  });

  // Delete a specific article by id
  router.delete("/post/:id", (req: Request, res: Response) => {
    const articleId = req.params.id;
    res.send(`Delete a specific article by its ID: ${articleId}`);
  });

  return router;
};

export default postsRoutes;
