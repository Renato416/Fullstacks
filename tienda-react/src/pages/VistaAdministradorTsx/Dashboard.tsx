import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/CSS/VistaAdministradorTsxCSS/dashboard.css";
import { obtenerProductos, obtenerUsuarios } from "../../assets/data/data";
// Importamos el Layout unificado
import AdminLayout from "../../components/administrador/AdminLayout";

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
    // Envolvemos todo en AdminLayout para mantener márgenes y diseño
    <AdminLayout title="Vista Administrador - Dashboard" activePage="dashboard">
      <div className="table-responsive">
        {/* Usamos nuestra clase .dashboard-table y quitamos las de bootstrap que interfieren */}
        <table className="table dashboard-table">
          <thead>
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
    </AdminLayout>
  );
}