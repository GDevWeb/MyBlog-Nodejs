export const generateDateNow = (): string => {
  const date = new Date();

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const dateNow = date.toLocaleDateString("fr-FR", options);
  console.log(dateNow);

  return dateNow;
};
