// types for a post

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  publishedDate: string;
  tags: string[];
}

export default Post;
