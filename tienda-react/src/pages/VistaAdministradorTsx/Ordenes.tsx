import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/CSS/VistaAdministradorTsxCSS/ordenes.css";
import Logo from "../../assets/IMG/icon-level-up.png";

export default function Ordenes() {
  const navigate = useNavigate();

  const ordenes = [
    { id: "001", usuario: "Juan Pérez", fecha: "2025-10-28", total: "$149.990 CLP", estado: "Pendiente" },
    { id: "002", usuario: "María López", fecha: "2025-10-27", total: "$72.990 CLP", estado: "Entregado" },
    { id: "003", usuario: "Carlos Gómez", fecha: "2025-10-26", total: "$134.990 CLP", estado: "En Proceso" },
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
          <Link className="nav-item active" to="/ordenes">Órdenes</Link>
          <Link className="nav-item" to="/productos">Productos</Link>
          <Link className="nav-item" to="/categorias">Categorías</Link>
          <Link className="nav-item" to="/usuarios">Usuarios</Link>
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
          <h1>Vista Administrador - Órdenes</h1>
        </header>

        <section className="content container mt-4">
          <div className="table-responsive">
            <table className="table table-striped orders-table">
              <thead className="table-dark">
                <tr>
                  <th>ID Orden</th>
                  <th>Usuario</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {ordenes.map((orden) => (
                  <tr key={orden.id}>
                    <td>{orden.id}</td>
                    <td>{orden.usuario}</td>
                    <td>{orden.fecha}</td>
                    <td>{orden.total}</td>
                    <td>{orden.estado}</td>
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
