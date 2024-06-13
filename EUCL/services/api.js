// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.5.222.183:3000/api/',  // Update with your backend server address
});

export default api;
