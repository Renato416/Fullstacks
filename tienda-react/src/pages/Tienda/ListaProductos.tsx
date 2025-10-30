import React, { useState, useEffect } from "react";
import Header from "../../components/Tienda/Header";
import Footer from "../../components/Tienda/Footer";
import { productos } from "../../assets/data/data";
import type { Producto } from "../../assets/data/data";
import "../../assets/CSS/Tienda/styles.css";
import "../../assets/CSS/Tienda/listaProducto.css";

interface ProductoCarrito {
  id: string;
  cantidad: number;
}

const ListaProducto: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Producto[]>(productos);

  useEffect(() => {
    const filtered = productos.filter((p) =>
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm]);

  // 🔹 Estado local del carrito
  const [_carrito, setCarrito] = useState<ProductoCarrito[]>(() => {
    return JSON.parse(localStorage.getItem("carrito") || "[]");
  });

  // 🔹 Agregar producto al carrito (sin duplicar por StrictMode)
const handleAddToCart = (id: string) => {
  let carritoActual = JSON.parse(localStorage.getItem("carrito") || "[]");

  const productoExistente = carritoActual.find((item: ProductoCarrito) => item.id === id);

  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carritoActual.push({ id, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carritoActual));
  setCarrito(carritoActual);

  // 🔸 Notificación única
  alert("Producto agregado al carrito 🛒");

  // 🔸 Dispara evento personalizado para que el Header se actualice en tiempo real
  window.dispatchEvent(new Event("carrito-actualizado"));
};


  return (
    <>
      <Header />

      <main>
        <h2>PRODUCTOS</h2>

        <div className="search-container">
          <input
            id="searchInput"
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="productos-grid">
          {filteredProducts.map((product) => (
            <div className="producto" key={product.id}>
              <img src={product.imagen} alt={product.nombre} />
              <h3 className="titulo">{product.nombre}</h3>
              <p className="precio">${product.precio.toLocaleString()}</p>
              <button onClick={() => handleAddToCart(product.id)}>
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ListaProducto;
