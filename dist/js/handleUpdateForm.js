document.addEventListener("DOMContentLoaded", async () => {
    try {
        const updateForm = document.getElementById("updatePostForm");
        if (!updateForm) {
            console.error("Update form not found!");
            return;
        }
        updateForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            console.log("Form submission started...");
            const formData = new FormData(updateForm);
            // Extract form data
            const titleData = formData.get("title")?.toString() || "No title provided";
            const contentData = formData.get("content")?.toString() || "No content provided";
            const authorData = formData.get("author")?.toString() || "No author provided";
            const tagsData = formData.get("tags")?.toString() || "No tags provided";
            // Grouped logging
            console.log("Form Data:", {
                title: titleData,
                content: contentData,
                author: authorData,
                tags: tagsData,
            });
            // Optional: Further process formData (e.g., sending to an API)
        });
        console.log("Update form ready for submission.");
    }
    catch (error) {
        console.error("An error has occurred:", error);
    }
});
export {};
