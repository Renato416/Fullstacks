import api from './api';
import type { Producto } from '../assets/data/data';

export const ProductoService = {

  // Obtener todos los productos
  getAll: async () => {
    const response = await api.get('/productos');
    
    // CORRECCIÓN HATEOAS:
    // Verificamos si la respuesta tiene la estructura "_embedded.productoDTOList"
    if (response.data._embedded && response.data._embedded.productoDTOList) {
        return response.data._embedded.productoDTOList;
    }
    
    // Fallback: Si por alguna razón el backend devolviera un array directo
    if (Array.isArray(response.data)) {
        return response.data;
    }

    return []; // Retorna lista vacía si no encuentra nada
  },

  // Obtener por ID
  getById: async (id: string) => {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  },

  // Crear
  create: async (producto: Producto) => {
    const response = await api.post('/productos', producto);
    return response.data;
  },

  // Actualizar
  update: async (id: string, producto: Partial<Producto>) => {
    const response = await api.put(`/productos/${id}`, producto);
    return response.data;
  },

  // Eliminar
  delete: async (id: string) => {
    await api.delete(`/productos/${id}`);
  }
};