import express from "express";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import path from "path";
// Import Routers:
import postsRoutes from "./routes/postsRoutes.js";
const __dirname = dirname(fileURLToPath(import.meta.url));
const server = express();
const host = "localhost:";
const port = process.env.PORT || 3000;
// Middlewares
// Parse json request:
server.use(express.json());
// Parse form data
server.use(express.urlencoded());
// Serve static files
// html pages
server.use(express.static(path.join(__dirname, "views")));
// styles and medias
server.use(express.static(path.join(__dirname, "public")));
// Routes
// ***General***
// homepage
server.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "views", "index.html"));
});
// aboutPage
server.get("/about", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "views", "about.html"));
});
// contactPage
server.get("/contact", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "views", "contact.html"));
});
// Posts:
server.use("/posts", postsRoutes());
server.get("/add-article", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "views", "add-article.html"));
});
server.get("/update-article", (req, res) => {
    res
        .status(200)
        .sendFile(path.join(__dirname, "views", "update-article.html"));
});
// errors
server.use(function (req, res, next) {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});
// Error-handling middleware
server.use(function (req, res, next) {
    res.status(500).send("Something went wrong");
});
server.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
