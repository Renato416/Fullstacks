import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/CSS/VistaAdministradorTsxCSS/usuario.css";
import AdminSidebar from "../../components/administrador/AdminSidebar";
// 1. Importamos el servicio de Autenticación (que tiene el método registro)
import { AuthService } from "../../services/AuthService";

export default function UsuarioNuevo() {
  const navigate = useNavigate();

  // 2. Estados adaptados al DTO de Java
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Nuevo campo
  const [fechaNacimiento, setFechaNacimiento] = useState(""); // Cambiado de edad a fecha
  const [rut, setRut] = useState(""); // Cambiado de telefono a RUT
  const [direccion, setDireccion] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validaciones básicas de Frontend
    if (
      !nombre ||
      !email ||
      !password ||
      !fechaNacimiento ||
      !rut ||
      !direccion
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      setLoading(true);

      // 3. Preparamos el objeto tal cual lo espera Java (RegistroUsuarioDTO)
      const nuevoUsuarioDTO = {
        nombreUsuario: nombre,
        correoElectronico: email,
        contraseña: password,
        fechaNacimiento: fechaNacimiento, // Formato YYYY-MM-DD (input type="date" lo da así)
        run: rut,
        direccion: direccion,
      };

      // 4. Enviamos al Backend
      await AuthService.registro(nuevoUsuarioDTO as any);

      // Si todo sale bien, volvemos a la lista
      alert("Usuario registrado exitosamente en la Base de Datos ✅");
      navigate("/usuarios");
    } catch (err: any) {
      console.error("Error registrando:", err);
      // Si el backend devuelve un mensaje de error (ej: "Correo ya registrado"), lo mostramos
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Hubo un error al registrar el usuario.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-app">
      <AdminSidebar activePage="usuarios" />

      <main className="main">
        <header className="topbar">
          <h1>Agregar Nuevo Usuario</h1>
        </header>

        <section className="content container mt-4">
          <form className="form-usuario" onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}

            {/* NOMBRE DE USUARIO */}
            <div className="mb-3">
              <label className="form-label">Nombre Completo:</label>
              <input
                type="text"
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            {/* CORREO */}
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* CONTRASEÑA (Nuevo) */}
            <div className="mb-3">
              <label className="form-label">Contraseña:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={4}
              />
            </div>

            {/* FECHA NACIMIENTO (Backend valida > 18 años) */}
            <div className="mb-3">
              <label className="form-label">Fecha de Nacimiento:</label>
              <input
                type="date"
                className="form-control"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                required
              />
            </div>

            {/* RUT (Antes Teléfono) */}
            <div className="mb-3">
              <label className="form-label">RUT:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej: 12.345.678-9"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                required
              />
            </div>

            {/* DIRECCIÓN */}
            <div className="mb-3">
              <label className="form-label">Dirección:</label>
              <input
                type="text"
                className="form-control"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                required
              />
            </div>

            <div className="d-flex gap-2">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Guardando..." : "Agregar Usuario"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/usuarios")}
              >
                Cancelar
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
