// src/services/AuthService.ts
import api from "./api";
import type { RegistroUsuarioDTO, UsuarioDTO } from "../assets/data/data";

export const AuthService = {
  // LOGIN: Recibe username y password, mapeando al backend
  login: async (credenciales: { username: string; password: string }) => {
    const payloadBackend = {
      correoElectronico: credenciales.username,
      contraseña: credenciales.password,
    };

    const response = await api.post("/auth/login", payloadBackend);

    // Guardamos token si viene
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);

      // Guardamos usuario si viene
      const usuarioData: UsuarioDTO | undefined = response.data.usuario || response.data;
      if (usuarioData) {
        localStorage.setItem("usuario", JSON.stringify(usuarioData));
      }
    }

    return response.data;
  },

  // REGISTRO
  registro: async (datosUsuario: RegistroUsuarioDTO) => {
    // Solo enviamos los campos que el backend espera
    const payload = {
      nombreUsuario: datosUsuario.nombreUsuario,
      correoElectronico: datosUsuario.correoElectronico,
      contraseña: datosUsuario.contraseña,
      direccion: datosUsuario.direccion,
      fechaNacimiento: datosUsuario.fechaNacimiento,
      run: datosUsuario.run,
      // Rol se asigna automáticamente en backend como "cliente"
    };

    const response = await api.post("/auth/registro", payload);
    return response.data;
  },

  // LOGOUT
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("usuarioActivo"); // legacy
    window.location.reload();
  },

  // Obtener usuario actual
  getCurrentUser: (): UsuarioDTO | null => {
    const userStr = localStorage.getItem("usuario");
    if (userStr) return JSON.parse(userStr) as UsuarioDTO;
    return null;
  },
};
