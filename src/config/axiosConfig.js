// axiosConfig.js
import axios  from 'axios';

axios.defaults.baseURL = 'http://167.99.64.12:6600/api'; 
// http://192.168.10.185:6600/

axios.interceptors.request.use(
  (config) => {
    // Get the token from localStorage or any other storage mechanism
    const token = localStorage.getItem('token'); 
    
    if (token) {
      // Add the token to the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle errors before the request is sent
    return Promise.reject(error);
  }
);
export default axios;

// omi vai : http://192.168.10.115:6600/
// sanoar vai : http://192.168.10.186:6500/