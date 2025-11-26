import api from './api';

export const UsuarioService = {

  // 1. Listar todos (GET /api/v2/auth/listar)
  getAll: async () => {
    const response = await api.get('/auth/listar');
    
    // Manejo de HATEOAS (Lista dentro de _embedded)
    if (response.data._embedded && response.data._embedded.usuarioDTOList) {
        return response.data._embedded.usuarioDTOList;
    }
    
    // Manejo de Array directo
    if (Array.isArray(response.data)) {
        return response.data;
    }

    return [];
  },

  // 2. Obtener uno por ID (GET /api/v2/auth/{id}) -> NECESARIO PARA EDITAR
  getById: async (id: string) => {
    const response = await api.get(`/auth/${id}`);
    return response.data;
  },

  // 3. Actualizar (PUT /api/v2/auth/{id}) -> NECESARIO PARA GUARDAR CAMBIOS
  update: async (id: string, datosUsuario: any) => {
    const response = await api.put(`/auth/${id}`, datosUsuario);
    return response.data;
  }
};