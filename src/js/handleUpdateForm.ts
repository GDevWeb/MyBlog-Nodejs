import PostType from "../types/post.types.js";

document.addEventListener("DOMContentLoaded", async () => {
  // **0.Check if the form is present into the DOM**
  try {
    const updateForm = document.getElementById(
      "updatePostForm"
    ) as HTMLFormElement | null;

    if (!updateForm) {
      console.error("Update form not found!");
      return;
    }

    /*          ***Fetching data***
     *  Prefill the form using the postId                   *
     *                                                      *
     *                                                      *
     */
    try {
      const postId: string | undefined = window.location.pathname
        .split("/")
        .pop();

      if (postId) {
        console.log("From the frontend postId;", postId);
      } else {
        console.log("Error retrieving postId");
      }

      /* Fetching on get posts/post/:id */
      const prefillForm = async () => {
        const response = await fetch(
          `http://localhost:3000/posts/post/${postId}?json=true`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          }
        );

        if (!response.ok) {
          console.error("Error fetching post data");
          throw new Error("Failed fetching post data");
        }

        // Parse as JSON only if the response is valid
        const postData: PostType = await response.json();
        console.log("Post Data:", postData);

        /* Populating the form */
        const titleInput = document.getElementById("title") as HTMLInputElement;
        console.log(titleInput);

        const imagePreview = document.getElementById(
          "imagePreview"
        ) as HTMLInputElement;
        const contentInput = document.getElementById(
          "content"
        ) as HTMLTextAreaElement;
        const authorInput = document.getElementById(
          "author"
        ) as HTMLInputElement;
        const tagsInput = document.getElementById("tags") as HTMLInputElement;

        if (titleInput) titleInput.value = postData.title;
        if (imagePreview) imagePreview.src = postData.imageUrl || "";
        console.log(imagePreview.src);

        if (contentInput) contentInput.value = postData.content;
        if (authorInput) authorInput.value = postData.author;
        if (tagsInput) tagsInput.value = postData.tags.join(", ");

        console.log("Form populated successfully");

        if (
          titleInput.value === "" ||
          imagePreview.src === "" ||
          contentInput.value === "" ||
          tagsInput.value === ""
        ) {
          console.log("An error has occurred populating form");
          return;
        }
      };
      prefillForm();
    } catch (error) {
      console.error("An error has occurred:", error);
    }

    /* **************************************************** */

    // updateForm.addEventListener("submit", async (event) => {
    //   event.preventDefault();
    //   console.log("Form submission started...");

    //   const formData = new FormData(updateForm);

    //   // Extract form data
    //   const titleData =
    //     formData.get("title")?.toString() || "No title provided";
    //   const contentData =
    //     formData.get("content")?.toString() || "No content provided";
    //   const authorData =
    //     formData.get("author")?.toString() || "No author provided";
    //   const tagsData = formData.get("tags")?.toString() || "No tags provided";

    //   // Grouped logging
    //   console.log("Form Data:", {
    //     title: titleData,
    //     content: contentData,
    //     author: authorData,
    //     tags: tagsData,
    //   });
    // });

    // Optional: Further process formData (e.g., sending to an API)

    console.log("Update form ready for submission.");
  } catch (error) {
    console.error("An error has occurred:", error);
  }
});
