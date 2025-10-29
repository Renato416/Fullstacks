// src/pages/VistaAdministradorTsx/Reportes.tsx
import React from "react";
import { Link } from "react-router-dom";
import "../../assets/CSS/VistaAdministradorTsxCSS/reportes.css";
import Logo from "../../assets/IMG/icon-level-up.png";

export default function Reportes() {
  const ventasPorCategoria = [
    { categoria: "Juegos de Mesa", vendidos: 10, total: "$249.900" },
    { categoria: "Accesorios", vendidos: 15, total: "$1.199.850" },
    { categoria: "Consolas", vendidos: 5, total: "$2.749.950" },
  ];

  const ventasPorProducto = [
    { producto: "Audifonos GAMER", cantidad: 5, total: "$324.950" },
    { producto: "Silla GAMER", cantidad: 3, total: "$218.970" },
    { producto: "Monitor GAMER", cantidad: 2, total: "$269.980" },
  ];

  const usuariosConCompras = [
    { nombre: "Juan Pérez", email: "juan@email.com", total: "$64.990" },
    { nombre: "María López", email: "maria@email.com", total: "$72.990" },
    { nombre: "Carlos Soto", email: "carlos@email.com", total: "$134.990" },
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
          <Link className="nav-item" to="/categorias">Categorías</Link>
          <Link className="nav-item" to="/usuarios">Usuarios</Link>
          <Link className="nav-item active" to="/reportes">Reportes</Link>
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
          <h1>Vista Administrador - Reportes</h1>
        </header>

        <section className="content">
          <div className="report-block">
            <h2>Ventas por Categoría</h2>
            <table className="report-table">
              <thead>
                <tr>
                  <th>Categoría</th>
                  <th>Productos Vendidos</th>
                  <th>Total en CLP</th>
                </tr>
              </thead>
              <tbody>
                {ventasPorCategoria.map((item, index) => (
                  <tr key={index}>
                    <td>{item.categoria}</td>
                    <td>{item.vendidos}</td>
                    <td>{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="report-block">
            <h2>Ventas por Producto</h2>
            <table className="report-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad Vendida</th>
                  <th>Total en CLP</th>
                </tr>
              </thead>
              <tbody>
                {ventasPorProducto.map((item, index) => (
                  <tr key={index}>
                    <td>{item.producto}</td>
                    <td>{item.cantidad}</td>
                    <td>{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="report-block">
            <h2>Usuarios con Compras</h2>
            <table className="report-table">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Email</th>
                  <th>Total Comprado</th>
                </tr>
              </thead>
              <tbody>
                {usuariosConCompras.map((usuario, index) => (
                  <tr key={index}>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.total}</td>
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
