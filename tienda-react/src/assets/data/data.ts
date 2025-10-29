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

<<<<<<< HEAD
export interface Producto {
  id: string;
  categoria: string;
  nombre: string;
  precio: number;
  imagen: string;
}

export let productos: Producto[] = [
  { id: "P001", categoria: "Accesorios", nombre: "Audífonos GAMER", precio: 64990, imagen: "/assets/IMG/audifonos.jpeg" },
  { id: "P002", categoria: "Muebles", nombre: "Silla GAMER", precio: 72990, imagen: "/assets/IMG/silla.jpeg" },
  { id: "P003", categoria: "Muebles", nombre: "Escritorio GAMER", precio: 70990, imagen: "/assets/IMG/Escritorio.webp" },
  { id: "P004", categoria: "Consolas", nombre: "Mando de Xbox GAMER", precio: 79990, imagen: "/assets/IMG/Mando.webp" },
  { id: "P005", categoria: "Accesorios", nombre: "Mouse GAMER", precio: 28990, imagen: "/assets/IMG/Mause.webp" },
  { id: "P006", categoria: "Accesorios", nombre: "Mousepad GAMER", precio: 6990, imagen: "/assets/IMG/mausepad.avif" },
  { id: "P007", categoria: "Monitores", nombre: "Monitor GAMER", precio: 134990, imagen: "/assets/IMG/monitor.jpeg" },
  { id: "P008", categoria: "Periféricos", nombre: "Teclado GAMER", precio: 15990, imagen: "/assets/IMG/Teclado.webp" },
];
=======
// Función para actualizar usuario existente
export function actualizarUsuario(id: string, datosActualizados: Partial<Usuario>) {
  const index = usuarios.findIndex(u => u.id === id);
  if (index !== -1) {
    usuarios[index] = { ...usuarios[index], ...datosActualizados };
  }
}
>>>>>>> 11848120f4da1bd1c6b4516e5d71a58ee33d058a
