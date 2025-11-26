// src/services/AuthService.ts
import api from './api';
import type { Usuario } from '../assets/data/data';

export const AuthService = {
  
  // LOGIN: Envía usuario/email y contraseña al backend
  login: async (credenciales: { username: string; password: string }) => {
    // POST http://localhost:8080/api/v2/auth/login
    const response = await api.post('/auth/login', credenciales);
    
    // IMPORTANTE: Si el backend devuelve el token, lo guardamos
    // (Asumimos que la respuesta trae una propiedad "token" o "accessToken")
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      
      // Guardamos los datos del usuario para mostrarlos en el perfil
      // (Si el backend devuelve el objeto usuario entero dentro de 'usuario')
      if (response.data.usuario) {
        localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
      }
    }
    return response.data;
  },

  // REGISTRO: Envía los datos del formulario de registro
  registro: async (datosUsuario: Usuario) => {
    // POST http://localhost:8080/api/v2/auth/registro
    const response = await api.post('/auth/registro', datosUsuario);
    return response.data;
  },

  // LOGOUT: Borra el token y los datos del navegador
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    // Opcional: Recargar la página para limpiar estados
    window.location.reload();
  },
  
  // Obtener usuario actual (útil para saber quién está logueado sin ir al backend)
  getCurrentUser: () => {
    const userStr = localStorage.getItem('usuario');
    if (userStr) return JSON.parse(userStr);
    return null;
  }
};