export const updateFormLayout = (pageTitle: string) => {
  return `
  <section>
  <h1>${pageTitle}</h1>
  <form id="updatePostForm" action="/posts/:id" method="POST">
  <label for="title">Title:</label>
  <input type="text" id="title" name="title" required>
  
  <label for="content">Content:</label>
  <textarea id="content" name="content" rows="5" required></textarea>
  
  <label for="author">Author:</label>
  <input type="text" id="author" name="author" required>
  
  <label for="tags">Tags (comma-separated):</label>
  <input type="text" id="tags" name="tags" required>
  
  <label for="image">Image URL:</label>
  <input type="text" id="imageUrl" name="imageUrl">
  
  <button type="submit">Update Post</button>
  </form>
  </section>
    `;
};
