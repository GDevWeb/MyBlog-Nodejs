import fs from "fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import path from "path";
import { generateDateNow } from "../utils/generateDateNow.js";
const __dirname = dirname(fileURLToPath(import.meta.url));
// Import Routers:
const postsFilePath = path.join(__dirname, "../data/", "posts.json");
class Post {
    id;
    title;
    content;
    author;
    publishedDate;
    tags;
    updatedAt;
    constructor(id, title, content, author, publishedDate, tags, updatedAt) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.publishedDate = publishedDate;
        this.tags = tags;
        this.updatedAt = updatedAt;
    }
    /* Helper methods */
    // Read the posts.json file
    static async readFile() {
        try {
            const data = await fs.readFile(postsFilePath, "utf-8");
            return JSON.parse(data);
        }
        catch (error) {
            console.error("Error reading file:", error);
            return [];
        }
    }
    // Read the posts.json file
    static async writeFile(data) {
        try {
            await fs.writeFile(postsFilePath, JSON.stringify(data, null, 2));
            console.log("Data successfully written:", data);
        }
        catch (error) {
            console.error("Error writing to file:", error);
        }
    }
    // Validate fields
    static validatePostData(data) {
        const { title, content, author, tags } = data;
        if (!title || typeof title !== "string" || title.length < 3) {
            throw new Error("Title must be a string with at least 3 characters long.");
        }
        if (!content || typeof content !== "string" || content.length < 10) {
            throw new Error("Content must be a string with at least 10 characters");
        }
        if (!author || typeof author !== "string") {
            throw new Error("Author must be a valide string");
        }
        if (!Array.isArray(tags)) {
            throw new Error("Tags must be an array string");
        }
    }
    /* ***Core methods*** */
    // retrieve all posts
    static async fetchAll() {
        try {
            const rawData = await fs.readFile(postsFilePath, "utf-8");
            const posts = JSON.parse(rawData);
            return posts;
        }
        catch (error) {
            console.error("Error reading posts file:", error);
            throw new Error("Could not fetch posts.");
        }
    }
    // search one post bu his id :
    static async findById(id) {
        try {
            const posts = await this.fetchAll();
            return posts.find((post) => Number(post.id) === id);
        }
        catch (error) {
            console.error("Error finding post:", error);
            return null;
        }
    }
    static async getLatest(count) {
        try {
            const posts = await this.fetchAll();
            return posts.slice(-count).reverse();
        }
        catch (error) {
            console.error("Error fetching latest posts:", error);
            throw new Error("Could not retrieve latest posts.");
        }
    }
    // create a post
    static async create(newPostData) {
        try {
            // 0.Validate incoming data
            this.validatePostData(newPostData);
            // 1.Create an unique id
            const newId = Date.now();
            const currentDate = generateDateNow();
            console.log(currentDate);
            // 2.Create post
            const newPost = {
                id: String(newId),
                ...newPostData,
                publishedDate: currentDate,
            };
            // 3.Fetch data
            const posts = await this.fetchAll();
            // 4.Append the new post to the dataset
            posts.push(newPost);
            // 5.save data into json file
            await this.writeFile(posts);
            // 6.return the new post
            return newPost;
        }
        catch (error) {
            console.error("Error creating post:", error);
            throw new Error("Failed to create post.");
        }
    }
    // 3.Update
    static async updateById({ id, title, content, author, tags, updatedAt, }) {
        try {
            // 1.fetch data
            const posts = await this.fetchAll();
            //  2.find postId
            const postIndex = posts.findIndex((post) => {
                post.id === id;
            });
            // 3.fallback
            // if there is a match:
            if (postIndex !== -1) {
                return null;
            }
            // if there is not match
            posts[postIndex] = {
                ...posts[postIndex],
                title: title || posts[postIndex].title,
                content: content || posts[postIndex].content,
                author: author || posts[postIndex].author,
                tags: tags || posts[postIndex].tags,
                updatedAt: generateDateNow(),
            };
            await this.writeFile(posts);
            // await this.writeFile(postsFilePath)
            return posts[postIndex];
        }
        catch (error) {
            console.error("Error updating post:", error);
            throw new Error("Failed to update post.");
        }
    }
    static async deleteById(id) {
        try {
            const posts = await this.fetchAll();
            const updatedPosts = posts.filter((post) => post.id !== id);
            /* Fallback */
            // not found
            if (posts.length === updatedPosts.length) {
                return null;
            }
            //deleted success
            await this.writeFile(updatedPosts);
            console.log(`Post ${id} deleted successfully✅`);
            return true;
        }
        catch (error) {
            console.error("Error deleting post:", error);
            throw new Error("Failed to delete post");
        }
    }
}
export default Post;
