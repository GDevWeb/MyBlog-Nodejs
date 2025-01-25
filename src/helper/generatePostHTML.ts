import Posts from "../types/post.types.js";

export const generatePost = (post: Posts): string => `
    <article>
      <h2>${post.title}</h2>
      <div class="container-article-image">
      <img src="${post.imageUrl}" alt="${post.title}" class="article-image" />
      </div>
      <p>${post.content}</p>
      <p><strong>Author:</strong> ${post.author}</p>
      <p><strong>Published Date:</strong> ${post.publishedDate}</p>
      <hr>
    <div class="containerCta">
      <button class="backBtn"><a href="/posts">Retour aux articles</a></button>
      <button class="updateBtn" data-id=${post.id}>Modifier</button>
      <button class="deleteBtn" data-id=${post.id}>Supprimer</button>
    </div>

  <div class="containerCta">
  </div>

    </article>
    `;
