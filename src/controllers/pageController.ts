import { Request, Response } from "express";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { renderPage } from "./layoutController.js";
const __dirname = dirname(fileURLToPath(import.meta.url));

import { aboutContent } from "../data/aboutContent.js";
import { addArticleContent } from "../data/addArticleContent.js";
import { contactContent } from "../data/contactContent.js";

export const getAboutPage = async (
  req: Request,
  res: Response,
  pageTitle: string = "About"
) => {
  try {
    const content = aboutContent("About me");

    renderPage(content, res, pageTitle);
  } catch (error) {
    console.error("Error rendering About page:", error);
    res.status(500).send("Failed to render About page.");
  }
};

export const getContactPage = async (
  req: Request,
  res: Response,
  pageTitle: string = "Contact"
) => {
  try {
    const content = contactContent("Contact");

    renderPage(content, res, "Contact");
  } catch (error) {
    console.error("Error rendering Contact page:", error);
    res.status(500).send("Failed to render Contact page.");
  }
};

export const getAddArticlePage = async (
  req: Request,
  res: Response,
  pageTitle: string = "Ajouter un article"
) => {
  try {
    const content = addArticleContent("Ajouter un article");

    renderPage(content, res, "Ajouter un article");
  } catch (error) {
    console.error("Error rendering AddArticle page:", error);
    res.status(500).send("Failed to render AddArticle page.");
  }
};

export const getUpdateArticlePage = async (
  req: Request,
  res: Response,
  pageTitle: string = "Modifier un article"
) => {
  try {
    const content = addArticleContent("Modifier un article");

    renderPage(content, res, "Ajouter un article");
  } catch (error) {
    console.error("Error rendering AddArticle page:", error);
    res.status(500).send("Failed to render AddArticle page.");
  }
};
