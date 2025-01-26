document.addEventListener("DOMContentLoaded", () => {
    const deleteBtn = document.querySelector(".deleteBtn");
    /* Delete */
    deleteBtn?.addEventListener("click", async (event) => {
        const target = event.currentTarget;
        const postId = target.dataset.id;
        if (!postId) {
            console.error("No post ID found.");
            return;
        }
        const userConfirmed = confirm("Voulez-vous supprimer cet article?");
        if (!userConfirmed) {
            return;
        }
        try {
            const response = await fetch(`/posts/delete-post/${postId}`, {
                method: "DELETE",
            });
            console.log("Response status:", response.status);
            console.log("Response content type:", response.headers.get("content-type"));
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const postElement = target.closest(".post");
            if (postElement) {
                postElement.remove();
            }
            else {
                console.warn("Post element not found in DOM.");
            }
            window.location.href = "/";
        }
        catch (error) {
            console.error("Error deleting post:", error);
            alert("Une erreur est survenue lors de la suppression de l'article.");
        }
    });
});
export {};
