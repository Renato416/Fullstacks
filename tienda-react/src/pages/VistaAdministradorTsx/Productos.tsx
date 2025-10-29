import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/CSS/VistaAdministradorTsxCSS/productos.css";
import Logo from "../../assets/IMG/icon-level-up.png";

// Imágenes de productos
import Audifonos from "../../assets/IMG/audifonos.jpeg";
import Silla from "../../assets/IMG/silla.jpeg";
import Escritorio from "../../assets/IMG/Escritorio.webp";
import Mando from "../../assets/IMG/Mando.webp";
import Mouse from "../../assets/IMG/Mause.webp";
import Mousepad from "../../assets/IMG/mausepad.avif";
import Monitor from "../../assets/IMG/monitor.jpeg";
import Teclado from "../../assets/IMG/Teclado.webp";

export default function Productos() {
  const navigate = useNavigate();

  const [productos, setProductos] = useState([
    { codigo: "AC001", categoria: "Accesorios", imagen: Audifonos, nombre: "Audifonos GAMER", precio: "$64.990 CLP" },
    { codigo: "SG001", categoria: "Sillas Gamers", imagen: Silla, nombre: "Silla GAMER", precio: "$72.990 CLP" },
    { codigo: "CG001", categoria: "Computadores Gamers", imagen: Escritorio, nombre: "Escritorio GAMER", precio: "$70.990 CLP" },
    { codigo: "AC002", categoria: "Accesorios", imagen: Mando, nombre: "Mando de Xbox GAMER", precio: "$79.990 CLP" },
    { codigo: "MS001", categoria: "Mouse", imagen: Mouse, nombre: "Mouse GAMER", precio: "$28.990 CLP" },
    { codigo: "MP001", categoria: "Mousepad", imagen: Mousepad, nombre: "Mouse-pad GAMER", precio: "$6.990 CLP" },
    { codigo: "MO001", categoria: "Monitores", imagen: Monitor, nombre: "Monitor GAMER", precio: "$134.990 CLP" },
    { codigo: "TE001", categoria: "Teclados", imagen: Teclado, nombre: "Teclado GAMER", precio: "$15.990 CLP" },
  ]);

  const handleEliminar = (codigo: string) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      setProductos(productos.filter(prod => prod.codigo !== codigo));
    }
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
          <Link className="nav-item" to="/dashboard">Dashboard</Link>
          <Link className="nav-item" to="/ordenes">Órdenes</Link>
          <Link className="nav-item active" to="/productos">Productos</Link>
          <Link className="nav-item" to="/categorias">Categorías</Link>
          <Link className="nav-item" to="/usuarios">Usuarios</Link>
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
          <h1>Vista Administrador - Productos</h1>
        </header>
        <section className="content">
          <div className="table-wrapper">
            <div className="table-header">
              <button
                className="btn-add-user"
                onClick={() => navigate("/producto-nuevo")}
              >
                Agregar Producto
              </button>
            </div>

            <table className="product-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Categoría</th>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((prod) => (
                  <tr key={prod.codigo}>
                    <td>{prod.codigo}</td>
                    <td>{prod.categoria}</td>
                    <td>
                      <img src={prod.imagen} alt={prod.nombre} className="mini-img" />
                    </td>
                    <td>{prod.nombre}</td>
                    <td>{prod.precio}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => navigate(`/producto-editar/${prod.codigo}`)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleEliminar(prod.codigo)}
                      >
                        Eliminar
                      </button>
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
