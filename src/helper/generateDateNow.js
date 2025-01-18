export const generateDateNow = () => {
  const date = new Date();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const dateNow = date.toLocaleDateString("fr-FR", options);
  console.log(dateNow);

  return dateNow;
};

// generateDateNow();
