import Post from "../models/Post.js";
import { renderPage } from "./layoutController.js";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
/* ***Functions helpers*** */
import { generateHeaderHTML } from "../helper/generateHeaderHTML.js";
import { generatePost } from "../helper/generatePostHTML.js";
import { generatePostsHTML } from "../helper/generatePostsHTML.js";
const __dirname = dirname(fileURLToPath(import.meta.url));
/* configure multer */
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.fetchAll();
        // render in HTML
        const postToHTML = posts.map(generatePostsHTML).join("");
        const html = generateHeaderHTML({
            headerTitle: "All Blog Posts",
            h1: "All blog Posts",
            content: postToHTML,
        });
        // res.status(200).send(html);
        renderPage(html, res, "Tous les articles");
    }
    catch (error) {
        console.error("Error reading posts:", error);
        res.status(500).json({ error: "Failed to fetch posts" });
    }
};
export const getPostsById = async (req, res) => {
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
            renderPage(html, res, `Détail de l'article ${post.title}`);
        }
        else {
            res.status(404).sendFile(path.join(__dirname, "../views/", "404.html"));
        }
    }
    catch (error) {
        console.error("Error finding post:", error);
        res.status(500).json({ error: "Failed finding post by id" });
    }
};
export const getLatestPosts = async (req, res) => {
    try {
        const latestPosts = await Post.getLatest(3);
        const postToHTML = latestPosts.map(generatePostsHTML).join("");
        const html = generateHeaderHTML({
            headerTitle: "Accueil",
            h1: "Derniers articles",
            content: postToHTML,
        });
        renderPage(html, res, "Accueil");
    }
    catch (error) {
        console.error("Error fetching latest posts", error);
        res.status(500).json({ error: "Failed to fetch latest posts" });
    }
};
export const createPost = async (req, res) => {
    try {
        const { title, content, author, publishedDate, tags } = req.body;
        const tagsArray = tags
            ? tags.split(",").map((tag) => tag.trim())
            : [];
        const filePath = req.file
            ? `/uploads/${req.file.filename}`
            : "/avatar/default.png";
        const newPost = {
            title,
            content,
            author,
            publishedDate,
            tags: tagsArray,
            imageUrl: filePath,
        };
        if (!newPost) {
            return res.status(400).json({ message: "Bad request" });
        }
        await Post.create(newPost);
        res.redirect("/posts");
    }
    catch (error) {
        console.error("Error creating a new post");
        res.status(500).json({ error: "Failed creating new post" });
    }
};
export const updatePost = async (req, res) => {
    try {
        // 1.Retrieve the id form params
        const postId = req.params.id;
        const { title, content, author, tags, imageUrl } = req.body;
        // 2.updatePost
        const updatedPost = await Post.updateById({
            id: postId,
            title,
            content,
            author,
            tags,
            imageUrl,
        });
        if (updatedPost) {
            // Success
            res.status(202).json(updatedPost);
        }
        else {
            // Not found
            res.status(404).sendFile(path.join(__dirname, "../views/", "404.html"));
        }
    }
    catch (error) {
        console.error("Error in updatePost controller:", error);
        res.status(500).send("Error updating post");
    }
};
export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const deletedPost = await Post.deleteById(postId);
        if (deletedPost) {
            res.redirect("/");
        }
        else {
            res.status(404).sendFile(path.join(__dirname, "../views/", "404.html"));
        }
        //
    }
    catch (error) {
        console.error("Error in deletePost controller:", error);
        res.status(500).send("Error deleting post");
    }
};
