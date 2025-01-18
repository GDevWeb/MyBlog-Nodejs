import fs from "fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import path from "path";
import PostsData from "../types/postsData.type.js";
const __dirname = dirname(fileURLToPath(import.meta.url));

// Import Routers:
const postsFilePath = path.join(__dirname, "../data/", "posts.json");

class Post {
  constructor(
    public id: string,
    public title: string,
    public content: string,
    public author: string,
    public publishedDate: string,
    public tags: string[]
  ) {}

  /* Helper methods */
  // Read the posts.json file
  static async readFile() {
    try {
      const data = await fs.readFile(postsFilePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading file:", error);
      return [];
    }
  }

  // Read the posts.json file
  static async writeFile(data: Post) {
    try {
      await fs.writeFile(postsFilePath, JSON.stringify(data, null, 2));
      console.log(data);
    } catch (error) {
      console.error("Error writing to file:", error);
    }
  }

  // Validate fields
  static validatePostData(data: Partial<PostsData>): void {
    const { title, content, author, publishedDate, tags } = data;

    if (!title || typeof title !== "string" || title.length < 3) {
      throw new Error("Title must be a string with at least 3 characters");
    }

    if (!content || typeof content !== "string" || content.length < 10) {
      throw new Error("Content must be a string with at least 10 characters");
    }

    if (!author || typeof author !== "string") {
      throw new Error("Author must be a valide string");
    }

    if (!publishedDate || isNaN(Date.parse(publishedDate))) {
      throw new Error("PublishedDate must be a valid date string");
    }

    if (!Array.isArray(tags)) {
      throw new Error("Tags must be an array string");
    }
  }

  /* ***Core methods*** */

  // retrieve all posts
  static async fetchAll(): Promise<PostsData[]> {
    try {
      const rawData = await fs.readFile(postsFilePath, "utf-8");
      const posts: PostsData[] = JSON.parse(rawData);
      return posts;
    } catch (error) {
      console.error("Error reading posts file:", error);
      throw new Error("Could not fetch posts.");
    }
  }

  // search one post bu his id :
  static async findById(id: number) {
    try {
      const posts = await this.fetchAll();
      return posts.find((post) => Number(post.id) === id);
    } catch (error) {
      console.error("Error finding post:", error);
      return null;
    }
  }

  // create a post
  static async create(newPostData: Omit<PostsData, "id">): Promise<PostsData> {
    try {
      // 0.Validate incoming data
      this.validatePostData(newPostData);
      // 1.Create an unique id
      const newId = Math.floor(Math.random() * 1000000);
      // 2.Create post
      const newPost: PostsData = { id: String(newId), ...newPostData };

      // 3.Fetch data
      const posts = await this.fetchAll();
      // 4.Append the new post to the dataset
      posts.push(newPost);
      // 5.save data into json file
      await fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2));
      // 6.return the new post
      return newPost;
    } catch (error) {
      console.error("Error creating post:", error);
      throw new Error("Failed to create post.");
    }
  }
}

export default Post;
