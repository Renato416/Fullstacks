import React from "react";
import { Link } from "react-router-dom";
import "../../assets/CSS/VistaAdministradorTsxCSS/usuario.css";
import Logo from "../../assets/IMG/icon-level-up.png";

export default function Usuarios() {
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
          <h1>Vista Administrador - Usuarios</h1>
        </header>
        <section className="content">
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Gmail</th>
                <th>Edad</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>U001</td>
                <td>Juan Pérez</td>
                <td>juan@Gmail.com</td>
                <td>25</td>
                <td>+56912345678</td>
                <td>Santiago, Chile</td>
                <td>
                  <button className="btn-edit">Editar Usuario</button>
                  <button className="btn-history">Ver Historial</button>
                </td>
              </tr>
              <tr>
                <td>U002</td>
                <td>María López</td>
                <td>maria@Gmail.com</td>
                <td>30</td>
                <td>+56987654321</td>
                <td>Valparaíso, Chile</td>
                <td>
                  <button className="btn-edit">Editar Usuario</button>
                  <button className="btn-history">Ver Historial</button>
                </td>
              </tr>
              {/* Más usuarios */}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
