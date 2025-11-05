import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/CSS/VistaAdministradorTsxCSS/admin-layout.css";
import Logo from "../../assets/IMG/icon-level-up.png";

interface AdminLayoutProps {
  title: string;
  children: React.ReactNode;
  activePage: string;
}

export default function AdminLayout({ title, children, activePage }: AdminLayoutProps) {
  const navigate = useNavigate();

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
          <Link className={`nav-item ${activePage === "dashboard" ? "active" : ""}`} to="/dashboard">Dashboard</Link>
          <Link className={`nav-item ${activePage === "ordenes" ? "active" : ""}`} to="/ordenes">Órdenes</Link>
          <Link className={`nav-item ${activePage === "productos" ? "active" : ""}`} to="/productos">Productos</Link>
          <Link className={`nav-item ${activePage === "categorias" ? "active" : ""}`} to="/categorias">Categorías</Link>
          <Link className={`nav-item ${activePage === "usuarios" ? "active" : ""}`} to="/usuarios">Usuarios</Link>
          <Link className={`nav-item ${activePage === "reportes" ? "active" : ""}`} to="/reportes">Reportes</Link>
        </nav>

        <div className="sidebar-foot">
          <button
            className="btn-logout"
            onClick={() => {
              localStorage.removeItem("usuarioActivo");
              navigate("/");
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <h1>{title}</h1>
        </header>
        <section className="content container mt-4">{children}</section>
      </main>
    </div>
  );
}
