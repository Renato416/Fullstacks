import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/CSS/VistaAdministradorTsxCSS/usuario.css";
import Logo from "../../assets/IMG/icon-level-up.png";
import { usuarios } from "../../assets/data/data.ts";

export default function Usuarios() {
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
          <Link className="nav-item" to="/dashboard">Dashboard</Link>
          <Link className="nav-item" to="/ordenes">Órdenes</Link>
          <Link className="nav-item" to="/productos">Productos</Link>
          <Link className="nav-item" to="/categorías">Categorías</Link>
          <Link className="nav-item active" to="/usuarios">Usuarios</Link>
          <Link className="nav-item" to="/reportes">Reportes</Link>
        </nav>

        <div className="sidebar-foot">
          <button
            className="btn-logout btn btn-danger"
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
          <h1>Vista Administrador - Usuarios</h1>
        </header>

        <section className="content container mt-4">
          <div className="mb-3">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/usuarios-nuevo")}
            >
              Agregar Usuario
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-striped user-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Edad</th>
                  <th>Teléfono</th>
                  <th>Dirección</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.edad}</td>
                    <td>{usuario.telefono}</td>
                    <td>{usuario.direccion}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => navigate(`/usuarios/editar/${usuario.id}`)}
                      >
                        Editar
                      </button>
                      <button className="btn btn-info btn-sm">Ver Historial</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
