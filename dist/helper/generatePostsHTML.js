export const generatePostsHTML = (post) => `
  <div>
    <h2>${post.title}</h2>
    <p>${post.content}</p>
    <p><strong>Author:</strong> ${post.author}</p>
    <p><strong>Published Date:</strong> ${post.publishedDate}</p>
    <hr>
    <a href=/posts/post/${post.id}>See article</a></li>
  </div>`;
