export const generateHeaderHTML = ({ content, css, }) => {
    return `
    ${css ? css : ""}
    ${content}
    `;
};
