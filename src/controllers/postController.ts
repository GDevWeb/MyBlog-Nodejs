import { Request, Response } from "express";
import Post from "../models/Post.js";

import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

/* ***Functions helpers*** */
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

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, author, publishedDate, tags } = req.body;

    const tagsArray = tags
      ? tags.split(",").map((tag: string) => tag.trim())
      : [];

    const newPost = {
      title,
      content,
      author,
      publishedDate,
      tags: tagsArray,
    };

    if (!newPost) {
      return res.status(400).json({ message: "Bad request" });
    }

    await Post.create(newPost);
    res.redirect("/posts");
  } catch (error) {
    console.error("Error creating a new post");
    res.status(500).json({ error: "Failed creating new post" });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    // 1.Retrieve the id form params
    const postId = req.params.id;
    console.log(postId);

    const { title, content, author, tags } = req.body;

    // 2.updatePost
    const updatedPost = await Post.updateById({
      id: postId,
      title,
      content,
      author,
      tags,
    });

    if (updatedPost) {
      // Success
      res.status(202).json(updatedPost);
    } else {
      // Not found
      res.status(404).sendFile(path.join(__dirname, "../views/", "404.html"));
    }
  } catch (error) {
    console.error("Error in updatePost controller:", error);
    res.status(500).send("Error updating post");
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    const deletedPost = await Post.deleteById(postId);

    if (deletedPost) {
      res.redirect("/");
    } else {
      res.status(404).sendFile(path.join(__dirname, "../views/", "404.html"));
    }
    //
  } catch (error) {
    console.error("Error in deletePost controller:", error);
    res.status(500).send("Error deleting post");
  }
};
