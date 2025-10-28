import React, { useState, useEffect } from "react";
import "../../assets/css/administrador/listado_product.css";

interface Product {
  date: string;
  id: string;
  name: string;
  category: string;
  stock: number;
  price: string;
}

const ListadoProductos: React.FC = () => {
  const [products] = useState<Product[]>([
    { date: "2024-06-01", id: "P001", name: "Teclado Mecánico", category: "Electrónica", stock: 120, price: "$50.00" },
    { date: "2024-06-02", id: "P002", name: "Silla Gamer", category: "Muebles", stock: 30, price: "$150.00" },
    { date: "2024-06-03", id: "P003", name: "Audífonos Bluetooth", category: "Electrónica", stock: 75, price: "$40.00" },
    { date: "2024-06-04", id: "P004", name: "Mouse Inalámbrico", category: "Electrónica", stock: 200, price: "$25.00" },
    { date: "2024-06-05", id: "P005", name: "Escritorio de Madera", category: "Muebles", stock: 15, price: "$300.00" },
    { date: "2024-06-06", id: "P006", name: "Monitor 27\"", category: "Electrónica", stock: 40, price: "$220.00" },
    { date: "2024-06-07", id: "P007", name: "Lámpara LED", category: "Iluminación", stock: 60, price: "$35.00" },
    { date: "2024-06-08", id: "P008", name: "Cámara Web HD", category: "Electrónica", stock: 50, price: "$70.00" }
  ]);

  const rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);

  useEffect(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    setCurrentProducts(products.slice(start, end));
  }, [currentPage, products]);

  const totalPages = Math.ceil(products.length / rowsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Company</h2>
        <ul>
          <li><a href="#">Dashboard</a></li>
          <li><a href="#" className="active">Productos</a></li>
          <li><a href="#">Inventario</a></li>
          <li><a href="#">Reportes</a></li>
          <li><a href="#">Empleados</a></li>
          <li><a href="#">Clientes</a></li>
        </ul>
      </aside>

      <main className="main">
        <div className="header">
          <h1>Productos</h1>
          <button className="btn-nuevo">NUEVO PRODUCTO</button>
        </div>

        <table id="productsTable">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>ID Producto</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Stock</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((p) => (
              <tr key={p.id}>
                <td>{p.date}</td>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>{p.stock}</td>
                <td>{p.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>«</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>»</button>
        </div>
      </main>
    </div>
  );
};

export default ListadoProductos;
