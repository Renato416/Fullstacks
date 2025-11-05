import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/CSS/VistaAdministradorTsxCSS/productos.css";
import "../../assets/CSS/VistaAdministradorTsxCSS/admin-layout.css";
import AdminSidebar from "../../components/administrador/AdminSidebar";

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
      <AdminSidebar activePage="productos" />
      <main className="main">
        <header className="topbar">
          <h1>Vista Administrador - Productos</h1>
        </header>

        <div className="table-wrapper mb-3 d-flex justify-content-end">
          <button
            className="btn-add-user"
            onClick={() => navigate("/producto-nuevo")}
          >
            Agregar Producto
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-striped product-table">
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
                  <td>
                    <img
                      src={prod.imagen}
                      alt={prod.nombre}
                      className="mini-img"
                    />
                  </td>
                  <td>{prod.nombre}</td>
                  <td>${prod.precio.toLocaleString()} CLP</td>
                  <td className="d-flex gap-2 flex-wrap">
                    <button
                      className="btn-edit"
                      onClick={() => navigate(`/producto-editar/${prod.id}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleEliminar(prod.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
