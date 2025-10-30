// src/assets/data/data.ts

// Interfaces para tipado
export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  edad?: number;
  telefono: string;
  direccion?: string;
  password: string;
  rol?: "cliente" | "admin";
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

export interface Producto {
  id: string;
  categoria: string;
  nombre: string;
  precio: number;
  imagen: string;
}

// =============================
// Gestión de almacenamiento
// =============================

// Función para cargar datos desde localStorage o usar los valores iniciales
function cargarDesdeLocalStorage<T>(clave: string, datosIniciales: T): T {
  const datosGuardados = localStorage.getItem(clave);
  return datosGuardados ? JSON.parse(datosGuardados) : datosIniciales;
}

// Función para guardar datos en localStorage
function guardarEnLocalStorage<T>(clave: string, datos: T) {
  localStorage.setItem(clave, JSON.stringify(datos));
}

// =============================
// Datos iniciales
// =============================

const datosInicialesUsuarios: Usuario[] = [
  { id: "1", nombre: "Juan Pérez", email: "juan@duocuc.cl", telefono: "987654321", password: "1234", rol: "admin" },
  { id: "2", nombre: "María González", email: "maria@gmail.com", telefono: "912345678", password: "abcd", rol: "cliente" },
  { id: "3", nombre: "Renato", email: "re.rojasc@profesorduoc.cl", telefono: "999888777", password: "11111111", rol: "admin" },
  { id: "4", nombre: "Renato", email: "re.rojasc@duocuc.cl", telefono: "999888777", password: "11111111", rol: "admin" },
  { id: "5", nombre: "Renato", email: "re.rojasc@gmail.cl", telefono: "999888777", password: "11111111", rol: "cliente" },
];

const datosInicialesCategorias: Categoria[] = [
  { codigo: "AC", nombre: "Accesorios", cantidadProductos: 2 },
];

const datosInicialesOrdenes: Orden[] = [
  { id: "001", usuario: "Juan Pérez", fecha: "2025-10-28", total: 149990, estado: "Pendiente" },
];

const datosInicialesProductos: Producto[] = [
  { id: "P001", categoria: "Accesorios", nombre: "Audífonos GAMER", precio: 64990, imagen: "/assets/IMG/audifonos.jpeg" },
  { id: "P002", categoria: "Muebles", nombre: "Silla GAMER", precio: 72990, imagen: "/assets/IMG/silla.jpeg" },
  { id: "P003", categoria: "Muebles", nombre: "Escritorio GAMER", precio: 70990, imagen: "/assets/IMG/Escritorio.webp" },
  { id: "P004", categoria: "Consolas", nombre: "Mando de Xbox GAMER", precio: 79990, imagen: "/assets/IMG/Mando.webp" },
  { id: "P005", categoria: "Accesorios", nombre: "Mouse GAMER", precio: 28990, imagen: "/assets/IMG/Mause.webp" },
  { id: "P006", categoria: "Accesorios", nombre: "Mousepad GAMER", precio: 6990, imagen: "/assets/IMG/mausepad.avif" },
  { id: "P007", categoria: "Monitores", nombre: "Monitor GAMER", precio: 134990, imagen: "/assets/IMG/monitor.jpeg" },
  { id: "P008", categoria: "Periféricos", nombre: "Teclado GAMER", precio: 15990, imagen: "/assets/IMG/Teclado.webp" },
];

// =============================
// Inicialización de datos persistentes
// =============================

export let usuarios: Usuario[] = cargarDesdeLocalStorage("usuarios", datosInicialesUsuarios);
export let categorias: Categoria[] = cargarDesdeLocalStorage("categorias", datosInicialesCategorias);
export let ordenes: Orden[] = cargarDesdeLocalStorage("ordenes", datosInicialesOrdenes);
export let productos: Producto[] = cargarDesdeLocalStorage("productos", datosInicialesProductos);

// =============================
// Funciones CRUD (con persistencia)
// =============================

// Guardar todos los usuarios en localStorage
function actualizarLocalStorageUsuarios() {
  guardarEnLocalStorage("usuarios", usuarios);
}

// Agregar un usuario
export function agregarUsuario(usuario: Usuario) {
  usuarios.push(usuario);
  actualizarLocalStorageUsuarios();
}

// Obtener todos los usuarios
export function obtenerUsuarios() {
  return usuarios;
}

// Actualizar usuario existente
export function actualizarUsuario(id: string, datosActualizados: Partial<Usuario>) {
  const index = usuarios.findIndex(u => u.id === id);
  if (index !== -1) {
    usuarios[index] = { ...usuarios[index], ...datosActualizados };
    actualizarLocalStorageUsuarios();
  }
}

// Buscar usuario por correo y contraseña
export function buscarUsuario(email: string, password: string): Usuario | null {
  const emailNormalizado = email.trim().toLowerCase();
  const passwordNormalizado = password.trim();

  return (
    usuarios.find(
      u => u.email.trim().toLowerCase() === emailNormalizado &&
           u.password.trim() === passwordNormalizado
    ) || null
  );
}

// Registrar nuevo usuario (si no existe)
export function registrarUsuario(usuario: Usuario): boolean {
  const existe = usuarios.some(u => u.email.trim().toLowerCase() === usuario.email.trim().toLowerCase());
  if (existe) return false;
  usuarios.push(usuario);
  actualizarLocalStorageUsuarios();
  return true;
}
