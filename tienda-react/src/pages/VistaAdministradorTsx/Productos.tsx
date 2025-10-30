import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/CSS/VistaAdministradorTsxCSS/productos.css";
import Logo from "../../assets/IMG/icon-level-up.png";
import { obtenerProductos, eliminarProducto } from "../../assets/data/data";
import type { Producto } from "../../assets/data/data";


export default function Productos() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    setProductos(obtenerProductos());
  }, []);

  const handleEliminar = (id: string) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      eliminarProducto(id);
      setProductos(obtenerProductos());
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
        
        <div className="sidebar-foot">
          <button
  className="btn-logout"
  onClick={() => {
    localStorage.removeItem("usuarioActivo"); // Borra la sesión
    navigate("/"); // Redirige a Home de la tienda
  }}
>
  Cerrar sesión
</button>

        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <h1>Vista Administrador - Productos</h1>
        </header>

        <section className="content">
          <div className="table-wrapper">
            <div className="table-header">
              <button className="btn-add-user" onClick={() => navigate("/producto-nuevo")}>
                Agregar Producto
              </button>
            </div>

            <table className="product-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Categoría</th>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((prod) => (
                  <tr key={prod.id}>
                    <td>{prod.id}</td>
                    <td>{prod.categoria}</td>
                    <td><img src={prod.imagen} alt={prod.nombre} className="mini-img" /></td>
                    <td>{prod.nombre}</td>
                    <td>${prod.precio.toLocaleString()} CLP</td>
                    <td>
                      <button className="btn-edit" onClick={() => navigate(`/producto-editar/${prod.id}`)}>
                        Editar
                      </button>
                      <button className="btn-delete" onClick={() => handleEliminar(prod.id)}>
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
