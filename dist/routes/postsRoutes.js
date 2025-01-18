import express from "express";
const router = express.Router();
import { createPost, getPosts, getPostsById, } from "../controllers/postController.js";
const postsRoutes = () => {
    // middleware:
    router.use("/", (req, res, next) => {
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
    router.put("/post/:id", (req, res) => {
        const articleId = req.params.id;
        res.send(`Update a specific article by its ID: ${articleId}`);
    });
    // Delete a specific article by id
    router.delete("/post/:id", (req, res) => {
        const articleId = req.params.id;
        res.send(`Delete a specific article by its ID: ${articleId}`);
    });
    return router;
};
export default postsRoutes;
