import React, { useEffect } from "react";
import Header from "../../components/Tienda/Header";
import Footer from "../../components/Tienda/Footer";
import "../../assets/CSS/Tienda/styles.css";
import "../../assets/CSS/Tienda/registroUsuario.css";
import { registrarUsuario } from "../../assets/data/data";
import type { Usuario } from "../../assets/data/data";


const UserRegister: React.FC = () => {
  // 🔁 Actualiza el contador de productos del carrito
  const actualizarContadorCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    const totalItems = carrito.reduce(
      (acc: number, producto: { cantidad: number }) => acc + producto.cantidad,
      0
    );
    const contador = document.querySelector(".carrito-text");
    if (contador) contador.textContent = `Productos (${totalItems})`;
  };

  useEffect(() => {
    actualizarContadorCarrito();
  }, []);

  // 🧾 Maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nombre = (document.getElementById("nombre") as HTMLInputElement).value.trim();
    const email = (document.getElementById("correo") as HTMLInputElement).value.trim();
    const telefono = (document.getElementById("telefono") as HTMLInputElement).value.trim();
    const direccion = (document.getElementById("direccion") as HTMLInputElement).value.trim();
    const password = (document.getElementById("contrasena") as HTMLInputElement).value.trim();

    if (!nombre || !email || !telefono || !direccion || !password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const nuevoUsuario: Usuario = {
      id: Date.now().toString(),
      nombre,
      email,
      telefono,
      direccion,
      password,
      rol: "cliente",
    };

    const exito = registrarUsuario(nuevoUsuario);

    if (!exito) {
      alert("El correo ingresado ya está registrado.");
      return;
    }

    alert("Usuario registrado correctamente ✅");
    window.location.href = "/login"; // Redirige al login tras el registro
  };

  return (
    <>
      <Header />

      <main className="Registro-container">
        <h1>Registro de usuario</h1>

        <form className="Registro-formulario" onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre completo:</label>
          <input type="text" id="nombre" name="nombre" required />

          <label htmlFor="correo">Correo electrónico:</label>
          <input type="email" id="correo" name="correo" required />

          <label htmlFor="telefono">Teléfono:</label>
          <input type="tel" id="telefono" name="telefono" required />

          <label htmlFor="direccion">Dirección:</label>
          <input type="text" id="direccion" name="direccion" required />

          <label htmlFor="contrasena">Contraseña:</label>
          <input type="password" id="contrasena" name="contrasena" required />

          <button type="submit">Registrarse</button>
        </form>
      </main>

      <Footer />
    </>
  );
};

export default UserRegister;
