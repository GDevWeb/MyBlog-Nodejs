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
    public id: string,
    public title: string,
    public content: string,
    public author: string,
    public publishedDate: string,
    public tags: string[]
  ) {}

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
}

export default Post;
