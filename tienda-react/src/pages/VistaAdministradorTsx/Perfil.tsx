// Perfil.tsx
import React from "react";
import { Link } from "react-router-dom";
import "../../assets/CSS/VistaAdministradorTsxCSS/perfil.css";
import Logo from "../../assets/IMG/icon-level-up.png";

export default function Perfil() {
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
          <Link className="nav-item" to="/usuarios">Usuarios</Link>
          <Link className="nav-item" to="/reportes">Reportes</Link>
        </nav>
        <div className="nav-extra">
          <Link className="nav-item active" to="/perfil">Perfil</Link>
          <Link className="nav-item" to="#">Tienda</Link>
        </div>
        <div className="sidebar-foot">
          <button className="btn-logout">Cerrar sesión</button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <h1>Vista Administrador - Perfil</h1>
        </header>
        <section className="content">
          <div className="profile-container">
            <div className="profile-image">
              <img
                src={Logo}
                alt="Foto de perfil"
              />
            </div>
            <div className="profile-info">
              <p><strong>Nombre:</strong> Renato Rojas</p>
              <p><strong>Email:</strong> re.rojasc@duocuc.cl</p>
              <p><strong>Rol:</strong> Administrador</p>
              <button className="btn-edit-profile">Editar Información</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
