import fs from "fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Import Routers:
const postsFilePath = path.join(__dirname, "../data/", "posts.json");

interface PostData {
  id: string;
  title: string;
  content: string;
  author: string;
  publishedDate: string;
  tags: string[];
}

class Post {
  constructor(
    public id: number,
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

  /* ***Core methods*** */

  static async fetchAll(): Promise<PostData[]> {
    try {
      const rawData = await fs.readFile(postsFilePath, "utf-8");
      const posts: PostData[] = JSON.parse(rawData);
      return posts;
    } catch (error) {
      console.error("Error reading posts file:", error);
      throw new Error("Could not fetch posts.");
    }
  }

  static async findById(id: number) {
    try {
      const posts = await this.fetchAll();
      return posts.find((post) => Number(post.id) === id);
    } catch (error) {
      console.error("Error finding post:", error);
      return null;
    }
  }
}

export default Post;
