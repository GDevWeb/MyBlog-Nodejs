import fs from "fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import path from "path";
import PostType from "../types/post.types.js";
import PostsData, { PostsDataType } from "../types/postsData.type.js";
import { generateDateNow } from "../utils/generateDateNow.js";
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
    public tags: string[],
    public updatedAt?: string,
    public imageUrl?: string
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
  static async writeFile(data: Post[]): Promise<void> {
    try {
      await fs.writeFile(postsFilePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error writing to file:", error);
    }
  }

  // Validate fields
  static validatePostData(data: Partial<PostsData>): void {
    const { title, content, author, tags } = data;

    console.log("Validating Data:", data);

    if (!title || typeof title !== "string" || title.trim().length < 3) {
      throw new Error("Title must be a string with at least 3 characters.");
    }

    if (!content || typeof content !== "string" || content.trim().length < 10) {
      throw new Error("Content must be a string with at least 10 characters.");
    }

    if (!author || typeof author !== "string") {
      throw new Error("Author must be a valid string.");
    }

    if (!Array.isArray(tags)) {
      throw new Error("Tags must be an array of strings.");
    }

    // Add check for image
  }

  /* ***Core methods*** */

  // retrieve all posts
  static async fetchAll(): Promise<PostsDataType[]> {
    try {
      const rawData = await fs.readFile(postsFilePath, "utf-8");
      const posts: PostsData[] = JSON.parse(rawData);
      return posts;
    } catch (error) {
      console.error("Error reading posts file:", error);
      throw new Error("Could not fetch posts.");
    }
  }

  // search one post by his id :
  static async findById(id: number) {
    try {
      const posts = await this.fetchAll();
      return posts.find((post) => Number(post.id) === id);
    } catch (error) {
      console.error("Error finding post:", error);
      return null;
    }
  }

  static async getLatest(count: number): Promise<PostsData[]> {
    try {
      const posts = await this.fetchAll();

      return posts.slice(-count).reverse();
    } catch (error) {
      console.error("Error fetching latest posts:", error);
      throw new Error("Could not retrieve latest posts.");
    }
  }

  // create a post
  static async create(
    newPostData: Omit<PostsDataType, "id">
  ): Promise<PostsDataType> {
    try {
      // 0.Validate incoming data
      this.validatePostData(newPostData);
      // 1.Create an unique id
      const newId = Date.now();
      const currentDate = generateDateNow();

      const newPost: PostType = {
        id: String(newId),
        title: newPostData.title,
        content: newPostData.content,
        author: newPostData.author,
        publishedDate: currentDate,
        tags: newPostData.tags,
        imageUrl: newPostData.imageUrl,
      };

      // 3.Fetch data
      const posts = await this.fetchAll();
      // 4.Append the new post to the dataset
      posts.push(newPost);
      // 5.save data into json file
      await this.writeFile(posts);
      // 6.return the new post
      return newPost;
    } catch (error) {
      console.error("Error creating post:", error);
      throw new Error("Failed to create post.");
    }
  }

  // 3.Update
  // Update a post by ID
  static async updateById({
    id,
    title,
    content,
    author,
    tags,
    updatedAt,
    imageUrl,
  }: Partial<Post>): Promise<PostType | null> {
    try {
      // Fetch existing posts
      const posts = await this.fetchAll();

      // Find post index
      const postIndex = posts.findIndex((post) => post.id === id);

      // No post found
      if (postIndex === -1) {
        return null;
      }

      // Update the post
      posts[postIndex] = {
        ...posts[postIndex],
        title: title || posts[postIndex].title,
        content: content || posts[postIndex].content,
        author: author || posts[postIndex].author,
        tags: tags || posts[postIndex].tags,
        updatedAt: new Date().toISOString(),
        imageUrl: imageUrl || posts[postIndex].imageUrl,
      };

      // Save updated posts to file
      await this.writeFile(posts);

      // Return updated post
      return posts[postIndex];
    } catch (error) {
      console.error("Error updating post:", error);
      throw new Error("Failed to update post.");
    }
  }

  static async deleteById(id: string) {
    try {
      const posts = await this.fetchAll();

      const updatedPosts: PostType[] = posts.filter((post) => post.id !== id);

      /* Fallback */
      // not found
      if (posts.length === updatedPosts.length) {
        return null;
      }

      // delete - unlink img

      //deleted success
      await this.writeFile(updatedPosts);
      return true;
    } catch (error) {
      console.error("Error deleting post:", error);
      throw new Error("Failed to delete post");
    }
  }
}

export default Post;
