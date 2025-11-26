// src/pages/Tienda/RegisterUser.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Tienda/Header";
import Footer from "../../components/Tienda/Footer";
import "../../assets/CSS/Tienda/styles.css";
import "../../assets/CSS/Tienda/inicioSesion.css";
import type { RegistroUsuarioDTO } from "../../assets/data/data";
import { AuthService } from "../../services/AuthService";

const RegisterUser: React.FC = () => {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState(""); // Nueva
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden ❌");
      return;
    }

    if (!fechaNacimiento) {
      alert("Debes ingresar tu fecha de nacimiento ❌");
      return;
    }

    setCargando(true);

    try {
      const nuevoUsuario: RegistroUsuarioDTO = {
        nombreUsuario: nombre,
        correoElectronico: correo,
        contraseña: password,
        direccion: "",
        fechaNacimiento: fechaNacimiento, // Ahora se envía
        run: "",
      };

      const response = await AuthService.registro(nuevoUsuario);
      console.log("Usuario registrado:", response);

      alert("Usuario creado con éxito ✅");
      navigate("/login");
    } catch (error: any) {
      console.error("Error al registrar usuario:", error);
      if (error.response?.data?.message) {
        alert("Error: " + error.response.data.message);
      } else {
        alert("No se pudo crear el usuario ❌");
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <Header />
      <main className="InicioSesion-container">
        <h1>Registrar Usuario</h1>
        <form className="form-login" onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
          <input
            type="date"
            id="fechaNacimiento"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required
          />

          <button type="submit" disabled={cargando}>
            {cargando ? "Registrando..." : "Registrar"}
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default RegisterUser;
