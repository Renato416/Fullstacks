// src/pages/Tienda/LoginUser.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Tienda/Header";
import Footer from "../../components/Tienda/Footer";
import "../../assets/CSS/Tienda/styles.css";
import "../../assets/CSS/Tienda/inicioSesion.css";
import { buscarUsuario } from "../../assets/data/data";

const LoginUser: React.FC = () => {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const usuario = buscarUsuario(correo, contrasena);

    if (!usuario) {
      alert("Correo o contraseña incorrectos.");
      return;
    }

    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

    // Redirección interna usando useNavigate
    if (
      correo.endsWith("@duocuc.cl") ||
      correo.endsWith("@profesorduoc.cl")
    ) {
      navigate("/dashboard");
    } else {
      navigate("/tienda");
    }
  };

  return (
    <>
      <Header />

      <main className="InicioSesion-container">
        <h1>Inicio de sesión</h1>

        <form className="form-login" id="loginForm" onSubmit={handleSubmit}>
          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <label htmlFor="contrasena">Contraseña:</label>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />

          <button type="submit">Iniciar Sesión</button>
        </form>
      </main>

      <Footer />
    </>
  );
};

export default LoginUser;
