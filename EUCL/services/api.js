// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/',  // Update with your backend server address
});

export default api;
