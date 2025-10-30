import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/CSS/VistaAdministradorTsxCSS/usuario.css";
import Logo from "../../assets/IMG/icon-level-up.png";
import { usuarios, agregarUsuario } from "../../assets/data/data.ts";

export default function UsuarioNuevo() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [edad, setEdad] = useState<number | "">("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !email || !edad || !telefono || !direccion) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (typeof edad === "number" && edad < 18) {
      setError("El usuario debe ser mayor de 18 años.");
      return;
    }

    const newId = `U${(usuarios.length + 1).toString().padStart(3, "0")}`;

    const nuevoUsuario = { id: newId, nombre, email, edad, telefono, direccion,password: "1234"};

    agregarUsuario(nuevoUsuario);

    navigate("/usuarios");
  };

  return (
    <div className="admin-app">
      <aside className="sidebar">
        <div className="brand">
          <Link to="/dashboard">
            <img src={Logo} alt="Logo" className="logo" />
          </Link>
          <div className="brand-text">
            <div className="title">Level-Up Gamer</div>
          </div>
        </div>

        <nav className="nav">
          <Link className="nav-item" to="/dashboard">Dashboard</Link>
          <Link className="nav-item" to="/ordenes">Órdenes</Link>
          <Link className="nav-item" to="/productos">Productos</Link>
          <Link className="nav-item" to="/categorias">Categorías</Link>
          <Link className="nav-item active" to="/usuarios">Usuarios</Link>
          <Link className="nav-item" to="/reportes">Reportes</Link>
        </nav>

        <div className="nav-extra">
          <Link className="nav-item" to="/perfil">Perfil</Link>
          <Link className="nav-item" to="#">Tienda</Link>
        </div>

        <div className="sidebar-foot">
          <button className="btn-logout">Cerrar sesión</button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <h1>Agregar Nuevo Usuario</h1>
        </header>

        <section className="content">
          <form className="form-usuario" onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}

            <label>Nombre:</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label>Edad:</label>
            <input type="number" value={edad} onChange={(e) => setEdad(Number(e.target.value))} required />

            <label>Teléfono:</label>
            <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />

            <label>Dirección:</label>
            <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />

            <div className="form-buttons">
              <button type="submit" className="btn-add-user">Agregar Usuario</button>
              <button type="button" className="btn-edit" onClick={() => navigate("/usuarios")}>Cancelar</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
