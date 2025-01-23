interface HeaderHTMLTypes {
  headerTitle: string;
  h1: string;
  content: string;
}

export const generateHeaderHTML = ({ content }: HeaderHTMLTypes): string => {
  return `
    ${content}
    `;
};
