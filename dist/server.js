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
// errors
server.use(function (req, res, next) {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});
// Error-handling middleware
server.use(function (req, res, next) {
    res.status(500).send("Something went wrong");
});
server.listen(3000, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
