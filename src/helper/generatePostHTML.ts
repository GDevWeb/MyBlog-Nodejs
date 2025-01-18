import Posts from "../types/post.types.js";

export const generatePost = (post: Posts): string => `
    <div>
      <h2>${post.title}</h2>
      <p>${post.content}</p>
      <p><strong>Author:</strong> ${post.author}</p>
      <p><strong>Published Date:</strong> ${post.publishedDate}</p>
      <hr>
      <a href="/posts">Back to the articles</a>
      <a href="/posts/post/${post.id}">Update</a>
    </div>
    `;
