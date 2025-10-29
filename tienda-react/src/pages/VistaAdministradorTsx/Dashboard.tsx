// src/pages/VistaAdministradorTsx/Dashboard.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/CSS/VistaAdministradorTsxCSS/dashboard.css";
import Logo from "../../assets/IMG/icon-level-up.png";

export default function Dashboard() {
  const navigate = useNavigate();

  const resumen = {
    productos: 8,
    ordenesPendientes: 5,
    usuarios: 12,
    ventasTotales: "$1.234.990",
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
          <Link className="nav-item active" to="/dashboard">Dashboard</Link>
          <Link className="nav-item" to="/ordenes">Órdenes</Link>
          <Link className="nav-item" to="/productos">Productos</Link>
          <Link className="nav-item" to="/categorias">Categorías</Link>
          <Link className="nav-item" to="/usuarios">Usuarios</Link>
          <Link className="nav-item" to="/reportes">Reportes</Link>
        </nav>

        <div className="nav-extra">
          <Link className="nav-item" to="/perfil">Perfil</Link>
          <Link className="nav-item" to="/tienda">Tienda</Link>
        </div>

        <div className="sidebar-foot">
          <button className="btn-logout">Cerrar sesión</button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <h1>Vista Administrador - Dashboard</h1>
        </header>

        <section className="content">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Sección</th>
                <th>Resumen</th>
              </tr>
            </thead>
            <tbody>
              <tr onClick={() => navigate("/productos")} className="clickable-row">
                <td>Productos</td>
                <td>{resumen.productos} registrados</td>
              </tr>
              <tr onClick={() => navigate("/ordenes")} className="clickable-row">
                <td>Órdenes Pendientes</td>
                <td>{resumen.ordenesPendientes} órdenes</td>
              </tr>
              <tr onClick={() => navigate("/usuarios")} className="clickable-row">
                <td>Usuarios</td>
                <td>{resumen.usuarios} usuarios</td>
              </tr>
              <tr onClick={() => navigate("/reportes")} className="clickable-row">
                <td>Ventas Totales</td>
                <td>{resumen.ventasTotales}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
