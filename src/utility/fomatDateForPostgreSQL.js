export const formatDateForPostgreSQL = (inputDate) => {
    if (!inputDate) return null;
    const formattedDate = `${inputDate}T00:00:00.000Z`;
    return formattedDate;
  };