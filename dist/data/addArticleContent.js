export const addArticleContent = (title) => {
    return `
      <form action="/posts/create-post" method="POST" enctype="application/x-www-form-urlencoded">
      <h1>${title}</h1>
    <div class="formGroup">
      <label for="title">Title</label>
      <input
      type="text"
      id="title"
      name="title"
      placeholder="title"
      required
      />
    </div>
    <div class="formGroup>
      <label for="avatar">Image:</label>
      <input type="file" id="avatar" name="avatar" />
    </div>
    <div class="formGroup">
      <label for="content">Content</label>
      <textarea
      name="content"
      id="content"
      placeholder="content"
      required
      ></textarea>
    </div>
  <div class="formGroup">
    <label for="author">author</label>
    <input
    type="text" 
    name="author"
    id="author"
    placeholder="author"
    required
    />
  </div>
  <div class="formGroup">
    <label for="tags">Tags (comma-separated):</label>
    <input type="text" id="tags" name="tags" placeholder="e.g., tag1, tag2, tag3"><br><br>
  </div>
    <button type="submit">Add</button>
  </form>
    `;
};
