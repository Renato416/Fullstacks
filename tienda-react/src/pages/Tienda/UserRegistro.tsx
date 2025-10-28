import React, { useEffect } from "react";
import { Header } from "../../components/Tienda/Header";
import "../../assets/CSS/Tienda/styles.css";
import "../../assets/CSS/Tienda/registroUsuario.css";

export const UserRegister: React.FC = () => {
  // Función para actualizar el contador del carrito desde localStorage
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

  // Handler para el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Usuario registrado correctamente ✅");
  };

  return (
    <>
      <Header />

      <main className="Registro-container">
        <h1>Registro de usuario</h1>

        <form className="Registro-formulario" onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre completo:</label>
          <input type="text" id="nombre" name="nombre" required />

          <label htmlFor="contrasena">Contraseña:</label>
          <input type="password" id="contrasena" name="contrasena" required />

          <label htmlFor="region">Seleccione la región:</label>
          <select id="region" name="region" required>
            <option value="">--Seleccione una región--</option>
            <option value="region1">Región 1</option>
            <option value="region2">Región 2</option>
          </select>

          <label htmlFor="comuna">Seleccione la comuna:</label>
          <select id="comuna" name="comuna" required>
            <option value="">--Seleccione una comuna--</option>
            <option value="comuna1">Comuna 1</option>
            <option value="comuna2">Comuna 2</option>
          </select>

          <button type="submit">Registrarse</button>
        </form>
      </main>
    </>
  );
};
