// src/services/api.ts
import axios from 'axios';

// La URL base de tu backend
const api = axios.create({
  baseURL: 'http://localhost:8080/api/v2',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Antes de cada petición, inyecta el Token si existe
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Guardaremos el token aquí al loguearnos
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;