import PostData from "../types/postsData.type.js";

export const generatePostsHTML = (post: PostData): string => `
  <section>
  </section>
    <section id="posts">
      <article>
          <h2>${post.title}</h2>
            <p>
              ${post.content ? post.content.slice(0, 250) + "..." : ""}
            </p>
        <div class="containerCta">
          <p class="author">Auteur: <span>${post.author}</span></p>
          <a href=/posts/post/${post.id} class="seeMore">Voir article</a>
        </div>
      </article>
  </section> 
  `;
