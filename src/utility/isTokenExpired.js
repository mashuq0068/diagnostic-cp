import { jwtDecode } from "jwt-decode";


 const isTokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000;
  } catch (error) {
    return true; 
  }
};
 export default isTokenExpired