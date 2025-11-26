// src/pages/Tienda/LoginUser.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Tienda/Header";
import Footer from "../../components/Tienda/Footer";
import "../../assets/CSS/Tienda/styles.css";
import "../../assets/CSS/Tienda/inicioSesion.css";
import { AuthService } from "../../services/AuthService";

const LoginUser: React.FC = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);

    try {
      // Llamada al backend
      const usuarioDTO = await AuthService.login({
        username: correo,
        password: contrasena,
      });

      // Validamos que venga el token
      if (usuarioDTO?.token) {
        // Guardamos token y usuario completo en localStorage
        localStorage.setItem("token", usuarioDTO.token);
        localStorage.setItem("usuarioActivo", JSON.stringify(usuarioDTO));

        alert("Login exitoso ✅");

        // Redirigir según rol
        switch (usuarioDTO.rol) {
          case "admin":
            navigate("/dashboard");
            break;
          case "cliente":
            navigate("/tienda");
            break;
          default:
            navigate("/");
            break;
        }
      } else {
        alert("Credenciales incorrectas ❌");
      }
    } catch (error: any) {
      console.error("Error de login:", error);

      // Mostrar mensaje del backend si existe, si no, genérico
      const msg =
        error.response?.data?.message ||
        "Correo o contraseña incorrectos, o error de conexión ❌";
      alert(msg);
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <Header />

      <main className="InicioSesion-container">
        <h1>Inicio de sesión</h1>

        <form className="form-login" onSubmit={handleSubmit}>
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
