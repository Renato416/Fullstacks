import React, { useState, useEffect } from "react";
import Header from "../../components/Tienda/Header";
import Footer from "../../components/Tienda/Footer";
import ProductCard from "../../components/Tienda/ProductoCard";
import { productos } from "../../assets/data/data";
import type { Producto } from "../../assets/data/data"; // ✅ tipo importado correctamente
import "../../assets/CSS/Tienda/styles.css";
import "../../assets/CSS/Tienda/listaProducto.css";

const ListaProducto: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Producto[]>(productos);

  useEffect(() => {
    const filtered = productos.filter((p) =>
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm]);

  return (
    <>
      <Header />

      <main>
        <h2>PRODUCTOS</h2>

        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="productos-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              img={product.imagen}
              title={product.nombre}
              price={`$${product.precio.toLocaleString()}`}
            />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ListaProducto;
