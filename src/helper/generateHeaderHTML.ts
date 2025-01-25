interface HeaderHTMLTypes {
  headerTitle: string;
  h1: string;
  content: string;
  css?: string;
}

export const generateHeaderHTML = ({
  content,
  css,
}: HeaderHTMLTypes): string => {
  return `
    ${css ? css : ""}
    ${content}
    `;
};
