// types for a post

export interface PostType {
  id: string;
  title: string;
  content: string;
  author: string;
  publishedDate: string;
  tags: string[];
  imageUrl?: string;
}

export default PostType;
