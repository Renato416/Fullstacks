// src/services/AuthService.ts
import api from "./api";
import type { Usuario } from "../assets/data/data";

export const AuthService = {
  // LOGIN: Recibe username y password, pero los envía como correoElectronico y contraseña
  login: async (credenciales: { username: string; password: string }) => {
    // AQUÍ ESTÁ LA MAGIA: Mapeamos los datos al español para tu Backend
    const payloadBackend = {
      correoElectronico: credenciales.username, // username del form -> correoElectronico del DTO
      contraseña: credenciales.password, // password del form -> contraseña del DTO
    };

    // Enviamos el objeto traducido
    const response = await api.post("/auth/login", payloadBackend);

    // Si el backend devuelve el token, lo guardamos
    if (response.data.token) {
      // Ojo: Revisa si tu backend devuelve "token" o "access_token"
      localStorage.setItem("token", response.data.token);

      // Intentamos guardar el usuario si viene en la respuesta
      // (Puede venir directo o dentro de un EntityModel)
      const usuarioData = response.data.usuario || response.data;
      if (usuarioData) {
        localStorage.setItem("usuario", JSON.stringify(usuarioData));
      }
    }
    return response.data;
  },

  // REGISTRO
  registro: async (datosUsuario: Usuario) => {
    // Aquí también podrías necesitar mapear si tu RegistroUsuarioDTO usa nombres distintos
    // Por ahora probemos el login primero
    const response = await api.post("/auth/registro", datosUsuario);
    return response.data;
  },

  // LOGOUT
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("usuarioActivo"); // Limpiamos también el de tu código legacy
    window.location.reload();
  },

  // Obtener usuario actual
  getCurrentUser: () => {
    const userStr = localStorage.getItem("usuario");
    if (userStr) return JSON.parse(userStr);
    return null;
  },
};
