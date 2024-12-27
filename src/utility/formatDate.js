export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const unFormatDate = (formattedDate) => {
  if (!formattedDate) return null;

  const [year, month, day] = formattedDate.split("-");

  if (!year || !month || !day) return null;

  return new Date(year, parseInt(month, 10) - 1, day);
};
