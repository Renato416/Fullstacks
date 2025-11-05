import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/CSS/VistaAdministradorTsxCSS/admin-layout.css"; // Importamos el CSS global del layout
import { obtenerProductos, obtenerUsuarios } from "../../assets/data/data";
import AdminSidebar from "../../components/administrador/AdminSidebar"; // Importamos el nuevo Sidebar

export default function Dashboard() {
  const navigate = useNavigate();

  const [resumen, setResumen] = useState({
    productos: 0,
    ordenesPendientes: 5,
    usuarios: 0,
    ventasTotales: "$1.234.990",
  });

  useEffect(() => {
    const productos = obtenerProductos();
    const usuarios = obtenerUsuarios();

    setResumen((prev) => ({
      ...prev,
      productos: productos.length,
      usuarios: usuarios.length,
    }));
  }, []);

  return (
    <div className="admin-app container-fluid">
      <AdminSidebar /> {/* Reemplazamos el sidebar anterior */}

      <main className="main">
        <header className="topbar mb-3">
          <h1>Vista Administrador - Dashboard</h1>
        </header>

        <section className="content">
          <div className="table-responsive">
            <table className="table table-striped dashboard-table">
              <thead className="thead-dark">
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
          </div>
        </section>
      </main>
    </div>
  );
}
