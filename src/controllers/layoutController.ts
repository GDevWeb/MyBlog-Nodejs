import { Response } from "express";
import fs from "fs/promises";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const viewsPath = path.join(__dirname, "../views");

export const renderPage = async (
  content: string,
  res: Response,
  pageTitle: string = "titlePage",
  js?: string
) => {
  try {
    const header = await fs.readFile(
      path.join(viewsPath, "header.html"),
      "utf-8"
    );
    const footer = await fs.readFile(
      path.join(viewsPath, "footer.html"),
      "utf-8"
    );

    const html = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${pageTitle}</title>
        <link rel="stylesheet" href="/styles.css" />
        <script type="module" src=${js ? js : "/main.js"} defer></script>
      </head>
      <body>
        ${header}
        <main>
        <h1>${pageTitle}</h1>
          ${content}
        </main>
        ${footer}
      </body>
      </html>
    `;
    res.status(200).send(html);
  } catch (error) {
    console.error("Error rendering page:", error);
    res.status(500).send("Failed to render page.");
  }
};
