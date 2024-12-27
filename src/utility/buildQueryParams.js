/* eslint-disable no-unused-vars */
export const buildQueryParams = (params) => {
  const queryString = Object.entries(params)
    .filter(
      ([_, value]) => value !== "" && value !== null && value !== undefined
    ) 
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`) 
    .join("&");
  return queryString;
};
