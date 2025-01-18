import express from "express";
const router = express.Router();
import { getPosts } from "../controllers/postController.js";
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
    router.get("/post/:id", (req, res) => {
        const articleId = req.params.id;
        res.send(`Retrieve a specific article by its ID: ${articleId}`);
    });
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
