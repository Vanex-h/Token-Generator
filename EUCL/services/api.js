// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.5.223.246:3000/api',  // Update with your backend server address
});

export default api;
