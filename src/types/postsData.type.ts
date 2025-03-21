// types for an array of posts
interface PostsData {
  id: string;
  title: string;
  content: string;
  author: string;
  publishedDate: string;
  tags: string[];
  updatedAt?: string;
  imageUrl?: string;
}

export default PostsData;
