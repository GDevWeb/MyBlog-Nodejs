// types for a post

export interface PostType {
  id: string;
  title: string;
  content: string;
  author: string;
  tags: string[] | string;
  publishedDate?: string;
  imageUrl?: string;
  updatedAt?: string;
}

export default PostType;
