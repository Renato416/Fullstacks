// src/services/UsuarioService.ts
import api from './api';

export const UsuarioService = {

  // Obtener todos los usuarios
  getAll: async () => {
    // GET http://localhost:8080/api/v2/auth/listar
    const response = await api.get('/auth/listar');
    
    // Verificamos si viene empaquetado por HATEOAS (Spring Boot)
    if (response.data._embedded && response.data._embedded.usuarioDTOList) {
        return response.data._embedded.usuarioDTOList;
    }
    
    // Si viene como array directo
    if (Array.isArray(response.data)) {
        return response.data;
    }

    return [];
  }
};