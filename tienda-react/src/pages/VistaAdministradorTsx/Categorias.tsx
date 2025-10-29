// src/pages/VistaAdministradorTsx/Categorias.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/CSS/VistaAdministradorTsxCSS/categorias.css";
import Logo from "../../assets/IMG/icon-level-up.png";

export default function Categorias() {
  const navigate = useNavigate();

  const categorias = [
    { codigo: "JM", nombre: "Juegos de Mesa", productos: 2 },
    { codigo: "AC", nombre: "Accesorios", productos: 2 },
    { codigo: "CO", nombre: "Consolas", productos: 1 },
    { codigo: "CG", nombre: "Computadores Gamers", productos: 1 },
    { codigo: "SG", nombre: "Sillas Gamers", productos: 1 },
    { codigo: "MS", nombre: "Mouse", productos: 1 },
    { codigo: "MP", nombre: "Mousepad", productos: 1 },
    { codigo: "PP", nombre: "Poleras Personalizadas", productos: 1 },
    { codigo: "PL", nombre: "Polerones Gamers Personalizados", productos: 0 },
  ];

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
          <Link className="nav-item active" to="/categorias">Categorías</Link>
          <Link className="nav-item" to="/usuarios">Usuarios</Link>
          <Link className="nav-item" to="/reportes">Reportes</Link>
        </nav>

        <div className="nav-extra">
          <Link className="nav-item" to="/perfil">Perfil</Link>
          <Link className="nav-item" to="/tienda">Tienda</Link>
        </div>

        <div className="sidebar-foot">
          <button
            className="btn-logout"
            onClick={() => navigate("/login-user")}
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <h1>Vista Administrador - Categorías</h1>
        </header>

        <section className="content">
          <table className="category-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre de Categoría</th>
                <th>Número de Productos</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((cat) => (
                <tr key={cat.codigo}>
                  <td>{cat.codigo}</td>
                  <td>{cat.nombre}</td>
                  <td>{cat.productos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
