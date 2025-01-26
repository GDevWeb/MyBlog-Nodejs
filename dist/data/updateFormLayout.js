export const updateFormLayout = () => {
    return `
  <section>
  <form id="updatePostForm" action="/update-post/:id" method="POST">
  <div class="formGroup">
  <label for="title">Title:</label>
  <input type="text" id="title" name="title" required>
  </div>

  <div class="formGroup">
  <label for="imagePreview">Image URL:</label>
  <img src="" alt="current-image" id="imagePreview" name="imagePreview" max-width:"200px"/>
  </div>
  
  <div class="formGroup">
  <label for="image">Image URL:</label>
  <input type="file" id="imageUrl" name="imageUrl">
  </div>
  
  <div class="formGroup">
  <label for="content">Content:</label>
  <textarea id="content" name="content" rows="5" required></textarea>
  </div>
  
  <div class="formGroup">
  <label for="author">Author:</label>
  <input type="text" id="author" name="author" readonly>
  </div>
  
  <div class="formGroup">
  <label for="tags">Tags (comma-separated):</label>
  <input type="text" id="tags" name="tags" required>
  </div>
  
  <button type="submit">Update Post</button>
  </form>
  </section>
    `;
};
