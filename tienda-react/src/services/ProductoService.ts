// src/services/ProductoService.ts
import api from './api';
import type { Producto } from '../assets/data/data'; 

export const ProductoService = {

  // Obtener todos los productos (Para el Catálogo)
  // GET http://localhost:8080/api/v2/productos
  getAll: async () => {
    const response = await api.get('/productos');
    return response.data; 
  },

  // Obtener un producto por ID (Para la vista de detalle)
  // GET http://localhost:8080/api/v2/productos/{id}
  getById: async (id: string) => {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  },

  // === FUNCIONES DE ADMINISTRADOR ===

  // Crear nuevo producto
  // POST http://localhost:8080/api/v2/productos
  create: async (producto: Producto) => {
    const response = await api.post('/productos', producto);
    return response.data;
  },

  // Actualizar producto existente
  // PUT http://localhost:8080/api/v2/productos/{id}
  update: async (id: string, producto: Partial<Producto>) => {
    const response = await api.put(`/productos/${id}`, producto);
    return response.data;
  },

  // Eliminar producto
  // DELETE http://localhost:8080/api/v2/productos/{id}
  delete: async (id: string) => {
    await api.delete(`/productos/${id}`);
  }
};