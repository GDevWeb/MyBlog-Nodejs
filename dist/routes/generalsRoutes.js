import express from "express";
const router = express.Router();
const generalsRoutes = () => {
    // homepage
    // router.get("/", getLatestPosts);
    router.get("/", (req, res) => {
        res.status(200).send("Hello world");
    });
    return router;
};
export default generalsRoutes;
