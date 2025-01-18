import fs from "fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import path from "path";
const postsFilePath = path.join(__dirname, "../data/", "posts.json");
const htmlTemplatePAth = path.join(__dirname, "../views/", "index.html");
export const getPosts = async (req, res) => {
    try {
        const rawData = await fs.readFile(postsFilePath, "utf-8");
        const posts = JSON.parse(rawData);
        const postsToHTML = posts
            .map((post) => {
            return `
      <div>
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <p><strong>Author:</strong> ${post.author}</p>
        <p><strong>Published Date:</strong> ${post.publishedDate}</p>
        <hr>
      </div>
      `;
        })
            .join("");
        const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Posts</title>
  </head>
  <body>
    <h1>All Blog Posts</h1>
    ${postsToHTML}
  </body>
  </html>
  `;
        res.status(200).send(html);
    }
    catch (error) {
        console.error("Error reading posts:", error);
        res.status(500).json({ error: "Failed to fetch posts" });
    }
};
