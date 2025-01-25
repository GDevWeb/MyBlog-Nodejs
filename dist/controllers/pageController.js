import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { renderPage } from "./layoutController.js";
const __dirname = dirname(fileURLToPath(import.meta.url));
import { aboutContent } from "../data/aboutContent.js";
import { addArticleContent } from "../data/addArticleContent.js";
import { contactContent } from "../data/contactContent.js";
import { updateFormLayout } from "../data/updateFormLayout.js";
export const getAboutPage = async (req, res, pageTitle = "About") => {
    try {
        const content = aboutContent("About me");
        renderPage(content, res, pageTitle);
    }
    catch (error) {
        console.error("Error rendering About page:", error);
        res.status(500).send("Failed to render About page.");
    }
};
export const getContactPage = async (req, res, pageTitle = "Contact") => {
    try {
        const content = contactContent("Contact");
        renderPage(content, res, "Contact");
    }
    catch (error) {
        console.error("Error rendering Contact page:", error);
        res.status(500).send("Failed to render Contact page.");
    }
};
export const getAddArticlePage = async (req, res, pageTitle = "Ajouter un article") => {
    try {
        const content = addArticleContent("Ajouter un article");
        renderPage(content, res, "Ajouter un article");
    }
    catch (error) {
        console.error("Error rendering AddArticle page:", error);
        res.status(500).send("Failed to render AddArticle page.");
    }
};
export const getUpdateArticlePage = async (req, res, pageTitle = "Modifier un article") => {
    try {
        const content = "Modifier un article";
        renderPage(updateFormLayout(content), res, "Modifier un article");
    }
    catch (error) {
        console.error("Error rendering AddArticle page:", error);
        res.status(500).send("Failed to render AddArticle page.");
    }
};
