import React from "react";
import "../../assets/CSS/VistaAdministradorTsxCSS/reportes.css";
import AdminLayout from "../../components/administrador/AdminLayout";

export default function Reportes() {
  const ventasPorCategoria = [
    { categoria: "Juegos de Mesa", vendidos: 10, total: "$249.900" },
    { categoria: "Accesorios", vendidos: 15, total: "$1.199.850" },
    { categoria: "Consolas", vendidos: 5, total: "$2.749.950" },
  ];

  const ventasPorProducto = [
    { producto: "Audífonos GAMER", cantidad: 5, total: "$324.950" },
    { producto: "Silla GAMER", cantidad: 3, total: "$218.970" },
    { producto: "Monitor GAMER", cantidad: 2, total: "$269.980" },
  ];

  const usuariosConCompras = [
    { nombre: "Juan Pérez", email: "juan@email.com", total: "$64.990" },
    { nombre: "María López", email: "maria@email.com", total: "$72.990" },
    { nombre: "Carlos Soto", email: "carlos@email.com", total: "$134.990" },
  ];

  return (
    <AdminLayout title="Vista Administrador - Reportes" activePage="reportes">
      <section className="content container mt-4">
        <div className="report-block mb-4">
          <h2>Ventas por Categoría</h2>
          <div className="table-responsive">
            <table className="table table-striped report-table">
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
        </div>

        <div className="report-block mb-4">
          <h2>Ventas por Producto</h2>
          <div className="table-responsive">
            <table className="table table-striped report-table">
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
        </div>

        <div className="report-block mb-4">
          <h2>Usuarios con Compras</h2>
          <div className="table-responsive">
            <table className="table table-striped report-table">
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
        </div>
      </section>
    </AdminLayout>
  );
}
