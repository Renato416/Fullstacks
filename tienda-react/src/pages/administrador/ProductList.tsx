import React, { useEffect, useState } from "react";
import "../../assets/CSS/administrador/listado_product.css";

interface Product {
  date: string;
  id: string;
  name: string;
  category: string;
  stock: number;
  price: string;
}

export const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("productos") || "[]");

    const productsExample: Product[] = [
      { date: "2024-06-01", id: "P001", name: "Teclado Mecánico", category: "Electrónica", stock: 120, price: "$50.00" },
      { date: "2024-06-02", id: "P002", name: "Silla Gamer", category: "Muebles", stock: 30, price: "$150.00" },
      { date: "2024-06-03", id: "P003", name: "Audífonos Bluetooth", category: "Electrónica", stock: 75, price: "$40.00" }
    ];

    const allProducts: Product[] = [
      ...productsExample,
      ...storedProducts.map((p: any, index: number) => ({
        date: p.fecha,
        id: "P" + String(productsExample.length + index + 1).padStart(3, "0"),
        name: p.nombre,
        category: p.categoria,
        stock: p.stock,
        price: `$${p.precio.toFixed(2)}`
      }))
    ];

    setProducts(allProducts);
  }, []);

  const pageCount = Math.ceil(products.length / rowsPerPage);
  const displayProducts = products.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="container-fluid product-list-container">
      <div className="row g-0">
        <aside className="col-md-3 col-lg-2 sidebar d-flex flex-column">
          <div className="logo d-flex align-items-center mb-4">
            <img src="/VistaTienda/IMG/icon-level-up.png" alt="Logo Level-Up" className="me-2" />
            <span>Level-Up</span>
          </div>

          <nav className="menu flex-grow-1">
            <a href="Home_ad.html">📊 Dashboard</a>
            <a href="listado_produc.html" className="active">📦 Inventario</a>
            <a href="#">📑 Reportes</a>
            <a href="listado_usuario.html">👨‍💼 Empleados</a>
            <a href="#">👥 Clientes</a>
          </nav>

          <div className="bottom-menu mt-auto">
            <a href="#">⚙️ Configuración</a>
            <a href="#">🙍 Perfil</a>
            <a href="#">❓ Help</a>
          </div>

          <div className="profile text-center mt-3">
            <span>👤</span> Profile
          </div>
        </aside>

        <main className="col-md-9 col-lg-10 main-content">
          <header className="main-header d-flex justify-content-between align-items-center">
            <h1>Productos</h1>
            <a href="registro_producto.html">
              <button className="btn-nuevo">NUEVO PRODUCTO</button>
            </a>
          </header>

          <section className="content-box mt-4">
            <div className="table-responsive">
              <table className="table table-dark table-striped" id="productsTable">
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
                  {displayProducts.map((p, idx) => (
                    <tr key={idx}>
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
            </div>

            <div className="pagination mt-3 d-flex justify-content-center flex-wrap gap-2">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>«</button>
              {Array.from({ length: pageCount }, (_, i) => (
                <button
                  key={i}
                  className={currentPage === i + 1 ? "active" : ""}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button disabled={currentPage === pageCount} onClick={() => setCurrentPage(prev => prev + 1)}>»</button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
