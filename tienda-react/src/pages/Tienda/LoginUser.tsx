import React, { useEffect } from "react";
import { Header } from "../../components/Tienda/Header";
import "../../assets/CSS/Tienda/styles.css";
import "../../assets/CSS/Tienda/inicioSesion.css";

export const LoginUser: React.FC = () => {
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

  // 🔐 Maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const correo = (document.getElementById("correo") as HTMLInputElement).value.trim();

    if (correo.endsWith("@levelUp.cl")) {
      // En una app real, usarías navigate("/ruta") o router.
      window.location.href = "/admin/home";
    } else {
      alert("Acceso denegado: solo usuarios @levelUp.cl pueden entrar en esta demo.");
    }
  };

  return (
    <>
      <Header />

      <main className="InicioSesion-container">
        <h1>Inicio de sesión</h1>
      </main>

      <form className="form-login" id="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="correo">Correo:</label>
        <input type="email" id="correo" name="correo" required />

        <label htmlFor="contrasena">Contraseña:</label>
        <input type="password" id="contrasena" name="contrasena" required />

        <button type="submit">Iniciar Sesión</button>
      </form>
    </>
  );
};
