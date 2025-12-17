import api from './api';
import type { Producto } from '../assets/data/data';

export const ProductoService = {

  // ======================================
  // Obtener todos los productos (PÚBLICO)
  // ======================================
  getAll: async () => {
    const response = await api.get('/productos');
    
    // Corrección HATEOAS
    if (response.data._embedded && response.data._embedded.productoDTOList) {
      return response.data._embedded.productoDTOList;
    }

    if (Array.isArray(response.data)) {
      return response.data;
    }

    return [];
  },

  // ======================================
  // Obtener producto por ID (PÚBLICO)
  // ======================================
  getById: async (id: string) => {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  },

  // ======================================
  // Crear producto (ADMIN)
  // ======================================
  create: async (producto: Producto) => {
    const token = localStorage.getItem('token');

    const response = await api.post(
      '/productos',
      producto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  },

  // ======================================
  // Actualizar producto (ADMIN) ✅ FIX
  // ======================================
  update: async (id: string, producto: Partial<Producto>) => {
    const token = localStorage.getItem('token');

    const response = await api.put(
      `/productos/${id}`,
      producto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  },

  // ======================================
  // Eliminar producto (ADMIN)
  // ======================================
  delete: async (id: string) => {
    const token = localStorage.getItem('token');

    await api.delete(
      `/productos/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
};
