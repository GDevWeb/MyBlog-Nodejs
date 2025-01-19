interface HeaderHTMLTypes {
  headerTitle: string;
  h1: string;
  content: string;
}

export const generateHeaderHTML = ({
  headerTitle,
  h1,
  content,
}: HeaderHTMLTypes): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/styles.css">
    <title>${headerTitle}</title>
    </head>
    <body>
    <h1>${h1}</h1>
    ${content}
    </body>
    </html>
    `;
};
