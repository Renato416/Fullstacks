import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/CSS/VistaAdministradorTsxCSS/ordenes.css";
// Importamos el Layout unificado
import AdminLayout from "../../components/administrador/AdminLayout";

export default function Ordenes() {
  const navigate = useNavigate();

  const ordenes = [
    { id: "001", usuario: "Juan Pérez", fecha: "2025-10-28", total: "$149.990 CLP", estado: "Pendiente" },
    { id: "002", usuario: "María López", fecha: "2025-10-27", total: "$72.990 CLP", estado: "Entregado" },
    { id: "003", usuario: "Carlos Gómez", fecha: "2025-10-26", total: "$134.990 CLP", estado: "En Proceso" },
  ];

  return (
    <AdminLayout title="Vista Administrador - Órdenes" activePage="ordenes">
      <div className="table-responsive">
        {/* Quitamos las clases de bootstrap 'table-dark' o 'table-striped' 
            para que mande nuestro CSS personalizado (.orders-table) */}
        <table className="table orders-table">
          <thead>
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
    </AdminLayout>
  );
}