// src/pages/VistaAdministradorTsx/Perfil.tsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/CSS/VistaAdministradorTsxCSS/perfil.css";
import Logo from "../../assets/IMG/icon-level-up.png";

interface Usuario {
  nombre: string;
  correo: string;
  rol: string;
  imagen?: string;
}

export default function Perfil() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    // Leer siempre el usuario actualmente activo
    const data = localStorage.getItem("usuarioActivo");
    if (data) {
      setUsuario(JSON.parse(data));
    }
  }, []);

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
          <Link className="nav-item" to="/categorías">Categorías</Link>
          <Link className="nav-item" to="/usuarios">Usuarios</Link>
          <Link className="nav-item" to="/reportes">Reportes</Link>
        </nav>

        <div className="nav-extra">
          <Link className="nav-item active" to="/perfil">Perfil</Link>
          <Link className="nav-item" to="/tienda">Tienda</Link>
        </div>

        <div className="sidebar-foot">
          <button
            className="btn-logout"
            onClick={() => {
              localStorage.removeItem("usuarioActivo"); // Cerrar sesión
              navigate("/login-user");
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <h1>Vista Administrador - Perfil</h1>
        </header>

        <section className="content">
          <div className="profile-container">
            {!usuario ? (
              <div style={{ textAlign: "center", marginTop: "50px" }}>
                <p>No hay usuario activo.</p>
                <button
                  className="btn-add-user"
                  onClick={() => navigate("/login-user")}
                >
                  Iniciar sesión
                </button>
              </div>
            ) : (
              <>
                <div className="profile-image">
                  <img src={usuario.imagen || Logo} alt="Foto de perfil" />
                </div>
                <div className="profile-info">
                  <p><strong>Nombre:</strong> {usuario.nombre}</p>
                  <p><strong>Correo:</strong> {usuario.correo}</p>
                  <p><strong>Rol:</strong> {usuario.rol}</p>
                  <button className="btn-edit-profile">Editar Información</button>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
