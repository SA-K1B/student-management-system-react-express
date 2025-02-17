import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Base URL for the backend server
});

export default axiosInstance;