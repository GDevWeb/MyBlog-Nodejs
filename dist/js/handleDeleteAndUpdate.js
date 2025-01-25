document.addEventListener("DOMContentLoaded", () => {
    const deleteBtn = document.querySelector(".deleteBtn");
    deleteBtn?.addEventListener("click", async (event) => {
        const target = event.currentTarget;
        const postId = target.dataset.id;
        if (!postId) {
            console.error("No post ID found.");
            return;
        }
        const userConfirmed = confirm("Voulez-vous supprimer cet article?");
        if (!userConfirmed) {
            return; // Exit if the user cancels
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
            // Remove post element from DOM for smoother user feedback
            const postElement = target.closest(".post");
            if (postElement) {
                postElement.remove();
            }
            else {
                console.warn("Post element not found in DOM.");
            }
            // Optionally redirect to a safe route or reload the page
            window.location.href = "/"; // Redirect to the home page or another safe route
        }
        catch (error) {
            console.error("Error deleting post:", error);
            alert("Une erreur est survenue lors de la suppression de l'article.");
        }
    });
});
export {};
