// src/pages/Tienda/LoginUser.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Tienda/Header";
import Footer from "../../components/Tienda/Footer";
import "../../assets/CSS/Tienda/styles.css";
import "../../assets/CSS/Tienda/inicioSesion.css";

// CAMBIO 1: Importamos el servicio real en lugar de 'data.ts'
import { AuthService } from "../../services/AuthService";

const LoginUser: React.FC = () => {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  // Estado opcional para deshabilitar el botón mientras carga
  const [cargando, setCargando] = useState(false); 

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

  // CAMBIO 2: La función ahora es ASYNC para esperar al backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true); // Activamos estado de carga

    try {
      // Llamamos al Backend
      // Nota: El backend espera "username", así que le enviamos el correo ahí
      const response = await AuthService.login({
        username: correo, 
        password: contrasena
      });

      // Si llegamos aquí, el login fue EXITOSO (status 200)
      console.log("Login exitoso:", response);

      // Mantenemos tu lógica de "usuarioActivo" para que el resto de tu app no se rompa
      // (Aunque AuthService ya guarda el token y el usuario por su cuenta)
      if (response.usuario) {
        localStorage.setItem("usuarioActivo", JSON.stringify(response.usuario));
      }

      // Lógica de redirección (Mantenemos tu lógica original de dominios)
      if (
        correo.endsWith("@duocuc.cl") ||
        correo.endsWith("@profesorduoc.cl")
      ) {
        navigate("/dashboard");
      } else {
        navigate("/tienda");
      }

    } catch (error) {
      // Si el backend rechaza el login (status 401, 403, etc.) entra aquí
      console.error("Error de login:", error);
      alert("Correo o contraseña incorrectos, o error de conexión.");
    } finally {
      setCargando(false); // Desactivamos carga pase lo que pase
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

          <button type="submit" disabled={cargando}>
            {cargando ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>
      </main>

      <Footer />
    </>
  );
};

export default LoginUser;