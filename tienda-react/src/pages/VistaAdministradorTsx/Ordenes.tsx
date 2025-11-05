import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/CSS/VistaAdministradorTsxCSS/admin-layout.css"; // Importamos el CSS global del layout
import AdminSidebar from "../../components/administrador/AdminSidebar"; // Importamos el Sidebar

export default function Ordenes() {
  const navigate = useNavigate();

  const ordenes = [
    { id: "001", usuario: "Juan Pérez", fecha: "2025-10-28", total: "$149.990 CLP", estado: "Pendiente" },
    { id: "002", usuario: "María López", fecha: "2025-10-27", total: "$72.990 CLP", estado: "Entregado" },
    { id: "003", usuario: "Carlos Gómez", fecha: "2025-10-26", total: "$134.990 CLP", estado: "En Proceso" },
  ];

  return (
    <div className="admin-app">
      <AdminSidebar /> {/* Reemplazamos el sidebar anterior */}

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
