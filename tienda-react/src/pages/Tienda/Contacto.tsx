import React, { useEffect } from "react";
import { Header } from "../../components/Tienda/Header";
import logo from "../../assets/IMG/icon-level-up.png";
import "../../assets/CSS/Tienda/contacto.css";

export const Contacto: React.FC = () => {
  // 🔁 Actualiza el contador del carrito
  const actualizarContadorCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    const totalItems = carrito.reduce(
      (acc: number, producto: { cantidad: number }) => acc + producto.cantidad,
      0
    );
    const contador = document.querySelector(".carrito-text");
    if (contador) {
      contador.textContent = `Productos (${totalItems})`;
    }
  };

  useEffect(() => {
    actualizarContadorCarrito();
  }, []);

  // ✉️ Maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mensaje enviado correctamente ✅");
  };

  return (
    <>
      <Header />

      <div className="empresa">
        <div className="empresa-logo">
          <img src={logo} alt="Logo de la empresa" className="Logo" />
        </div>
        <h2>LEVEL-UP GAMER</h2>
      </div>

      <div className="formulario">
        <h3>FORMULARIO DE CONTACTOS</h3>

        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre">NOMBRE COMPLETO</label>
          <input type="text" id="nombre" name="nombre" required />

          <label htmlFor="correo">CORREO</label>
          <input type="email" id="correo" name="correo" required />

          <label htmlFor="contenido">CONTENIDO</label>
          <textarea id="contenido" name="contenido" required></textarea>

          <button type="submit">ENVIAR MENSAJE</button>
        </form>
      </div>
    </>
  );
};
