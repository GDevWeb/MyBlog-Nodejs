import { Request, Response } from "express";
import Post from "../models/post.js";

import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { generateHeaderHTML } from "../helper/generateHeaderHTML.js";
import { generatePost } from "../helper/generatePostHTML.js";
import { generatePostsHTML } from "../helper/generatePostsHTML.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.fetchAll();

    // render in HTML
    const postToHTML = posts.map(generatePostsHTML).join("");

    const html = generateHeaderHTML({
      headerTitle: "All Blog Posts",
      h1: "All blog Posts",
      content: postToHTML,
    });

    res.status(200).send(html);
  } catch (error) {
    console.error("Error reading posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

export const getPostsById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(Number(req.params.id));

    // render in HTML
    if (post) {
      const postToHTML = generatePost(post);

      const html = generateHeaderHTML({
        headerTitle: `Article ${post.title}`,
        h1: `${post.title}`,
        content: postToHTML,
      });
      res.status(200).send(html);
    } else {
      res.status(404).sendFile(path.join(__dirname, "../views/", "404.html"));
    }
  } catch (error) {
    console.error("Error finding post:", error);
    res.status(500).json({ error: "Failed finding post by id" });
  }
};
