import PostType from "../types/post.types.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const updateForm = document.getElementById(
      "updatePostForm"
    ) as HTMLFormElement | null;

    if (!updateForm) {
      console.error("Update form not found!");
      return;
    }

    const postId: string | undefined = window.location.pathname
      .split("/")
      .pop();

    if (!postId) {
      console.error("Error retrieving postId");
      return;
    }

    console.log("From the frontend postId:", postId);

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

      const postData: PostType = await response.json();
      console.log("Post Data:", postData);

      const titleInput = document.getElementById("title") as HTMLInputElement;
      const imagePreview = document.getElementById(
        "imagePreview"
      ) as HTMLImageElement;
      const imageInput = document.getElementById(
        "imageUrl"
      ) as HTMLInputElement;
      const contentInput = document.getElementById(
        "content"
      ) as HTMLTextAreaElement;
      const authorInput = document.getElementById("author") as HTMLInputElement;
      const tagsInput = document.getElementById("tags") as HTMLInputElement;

      if (titleInput) titleInput.value = postData.title;
      if (imagePreview) imagePreview.src = postData.imageUrl || "";
      if (contentInput) contentInput.value = postData.content;
      if (authorInput) authorInput.value = postData.author;
      if (tagsInput) tagsInput.value = postData.tags.join(", ");

      console.log("Form populated successfully");
    };

    await prefillForm();

    updateForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      console.log("Form submission started...");

      const formData = new FormData(updateForm);
      const imageInput = document.getElementById(
        "imageUrl"
      ) as HTMLInputElement;
      const imageFile = imageInput?.files?.[0] || null;

      const titleData =
        formData.get("title")?.toString() || "No title provided";
      const contentData =
        formData.get("content")?.toString() || "No content provided";
      const authorData =
        formData.get("author")?.toString() || "No author provided";
      const tagsData = formData.get("tags")?.toString() || "No tags provided";

      const newPostData = {
        title: titleData,
        content: contentData,
        author: authorData,
        tags: tagsData.split(", ").map((tag) => tag.trim()),
        imageUrl: imageFile ? URL.createObjectURL(imageFile) : "",
      };

      console.log("New Post Data:", newPostData);

      const updatePost = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/posts/update-post/${postId}`,
            {
              method: "PUT",
              headers: {
                "Content-type": "application/x-www-form-urlencoded",
              },
              body: formData,
            }
          );

          if (!response.ok) {
            const errorMessage = await response.text();
            console.error("Error from backend:", errorMessage);
            throw new Error(errorMessage);
          }

          console.log("Post updated successfully!");
          alert("Post updated successfully!");
          window.location.href = "/posts";
        } catch (error) {
          console.error("Error updating post:", error);
        }
      };

      await updatePost();
    });
  } catch (error) {
    console.error("An error has occurred:", error);
  }
});
