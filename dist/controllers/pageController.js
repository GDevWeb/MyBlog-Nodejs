import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { renderPage } from "./layoutController.js";
const __dirname = dirname(fileURLToPath(import.meta.url));
import { aboutContent } from "../data/aboutContent.js";
import { addArticleContent } from "../data/addArticleContent.js";
import { contactContent } from "../data/contactContent.js";
import { updateFormLayout } from "../data/updateFormLayout.js";
export const getAboutPage = async (req, res) => {
    try {
        const content = aboutContent("À propos");
        renderPage(content, res, "À propos");
    }
    catch (error) {
        console.error("Error rendering About page:", error);
        res.status(500).send("Failed to render About page.");
    }
};
export const getContactPage = async (req, res) => {
    try {
        const content = contactContent();
        renderPage(content, res, "Contact");
    }
    catch (error) {
        console.error("Error rendering Contact page:", error);
        res.status(500).send("Failed to render Contact page.");
    }
};
export const getAddArticlePage = async (req, res) => {
    try {
        const content = addArticleContent();
        renderPage(content, res, "Ajouter un article");
    }
    catch (error) {
        console.error("Error rendering AddArticle page:", error);
        res.status(500).send("Failed to render AddArticle page.");
    }
};
export const getUpdateArticlePage = async (req, res) => {
    try {
        renderPage(updateFormLayout(), res, "Modifier un article", '"/handleUpdateForm.js"');
    }
    catch (error) {
        console.error("Error rendering AddArticle page:", error);
        res.status(500).send("Failed to render AddArticle page.");
    }
};
