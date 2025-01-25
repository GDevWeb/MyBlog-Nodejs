// types for an array of posts
export interface PostsDataType {
  id: string;
  title: string;
  content: string;
  author: string;
  publishedDate: string;
  tags: string[];
  updatedAt?: string;
  imageUrl?: string;
}

export default PostsDataType;
