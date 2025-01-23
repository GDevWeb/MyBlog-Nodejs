import express, { NextFunction, Request, Response } from "express";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import path from "path";

// Import Routers:
import pageRoutes from "./routes/pageRoutes.js";
import postsRoutes from "./routes/postsRoutes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const server = express();

const host = "localhost";
const port = process.env.PORT || 3000;

// Middlewares
// Parse json request:
server.use(express.json());
// Parse form data
server.use(express.urlencoded({ extended: true }));

// Serve static files
// styles and medias
server.use(express.static(path.join(__dirname, "../public/css")));
// assets
server.use(express.static(path.join(__dirname, "../public/assets")));

// ***Routes***

// ***General***

// homepage
server.use("/", pageRoutes());

// Posts:
server.use("/posts", postsRoutes());

// errors
server.use(function (req: Request, res: Response, next: NextFunction) {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

// Error-handling middleware
server.use(function (req: Request, res: Response, next: NextFunction) {
  res.status(500).send("Something went wrong");
});

server.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
