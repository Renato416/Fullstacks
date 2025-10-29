import React from "react";
import { Link } from "react-router-dom";
import "../../assets/CSS/VistaAdministradorTsxCSS/ordenes.css";
import Logo from "../../assets/IMG/icon-level-up.png";

export default function Ordenes() {
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
          <Link className="nav-item active" to="/ordenes">Órdenes</Link>
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
          <h1>Vista Administrador - Órdenes</h1>
        </header>
        <section className="content">
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID Orden</th>
                <th>Usuario</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>001</td>
                <td>Juan Pérez</td>
                <td>2025-10-28</td>
                <td>$149.990 CLP</td>
                <td>Pendiente</td>
              </tr>
              <tr>
                <td>002</td>
                <td>María López</td>
                <td>2025-10-27</td>
                <td>$72.990 CLP</td>
                <td>Entregado</td>
              </tr>
              <tr>
                <td>003</td>
                <td>Carlos Gómez</td>
                <td>2025-10-26</td>
                <td>$134.990 CLP</td>
                <td>En Proceso</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
