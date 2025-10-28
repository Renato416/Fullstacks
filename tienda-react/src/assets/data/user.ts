export interface User {
  nombre: string;
  correo: string;
  usuario: string;
  contrasena: string;
  confirmar: string;
  telefono?: string; 
  rol: string;
  departamento: string;
}
export const users: User[] = [
  {
    nombre: "Juan Pérez",
    correo: "juan.perez@mail.com",
    usuario: "juanp",
    contrasena: "123456",
    confirmar: "123456",
    telefono: "987654321",
    rol: "Administrador",
    departamento: "Ventas",
  },
  {
    nombre: "María López",
    correo: "maria.lopez@mail.com",
    usuario: "marial",
    contrasena: "abcdef",
    confirmar: "abcdef",
    rol: "Usuario estándar",
    departamento: "Marketing",
  },
];