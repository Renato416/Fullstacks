// src/assets/data/data.ts

// Interfaces para tipado
export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  edad: number;
  telefono: string;
  direccion: string;
}

export interface Producto {
  id: string;
  categoria: string;
  nombre: string;
  precio: number;
  imagen: string;
}

export interface Categoria {
  codigo: string;
  nombre: string;
  cantidadProductos: number;
}

export interface Orden {
  id: string;
  usuario: string;
  fecha: string;
  total: number;
  estado: string;
}

// Datos iniciales
export let usuarios: Usuario[] = [
  { id: "U001", nombre: "Juan Pérez", email: "juan@gmail.com", edad: 25, telefono: "+56912345678", direccion: "Santiago, Chile" }
];

export let productos: Producto[] = [
  { id: "P001", categoria: "Accesorios", nombre: "Audífonos GAMER", precio: 64990, imagen: "audifonos.jpeg" }
];

export let categorias: Categoria[] = [
  { codigo: "AC", nombre: "Accesorios", cantidadProductos: 2 }
];

export let ordenes: Orden[] = [
  { id: "001", usuario: "Juan Pérez", fecha: "2025-10-28", total: 149990, estado: "Pendiente" }
];

// Funciones CRUD de ejemplo
export function agregarUsuario(usuario: Usuario) {
  usuarios.push(usuario);
}

export function obtenerUsuarios() {
  return usuarios;
}
