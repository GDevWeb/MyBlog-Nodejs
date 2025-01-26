import express from "express";
import { getAboutPage, getAddArticlePage, getContactPage, getUpdateArticlePage, } from "../controllers/pageController.js";
import { getLatestPosts } from "../controllers/postController.js";
const router = express.Router();
const generalsRoutes = () => {
    // Homepage
    router.get("/", getLatestPosts);
    // About
    router.get("/about", getAboutPage);
    // Contact
    router.get("/contact", getContactPage);
    // Add-article
    router.get("/add-article", getAddArticlePage);
    // Update-article
    router.get("/update-article/:id", getUpdateArticlePage);
    return router;
};
export default generalsRoutes;
