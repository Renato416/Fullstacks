import React, { useEffect, useState } from "react";
import Header from "../../components/Tienda/Header";
import Footer from "../../components/Tienda/Footer";
import ProductCard from "../../components/Tienda/ProductoCard";
import { ProductoService } from "../../services/ProductoService"; // tu servicio
import type { Producto } from "../../assets/data/data"; // interfaz

import "../../assets/CSS/Tienda/styles.css";

const Home: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await ProductoService.getAll(); // Trae del backend
        setProductos(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <>
      <Header />
      <section className="titulo-ofertas">
        <h2>¡LAS MEJORES OFERTAS!</h2>
      </section>

      <section className="productos-container">
        {productos.map((p: Producto) => (
          <ProductCard
            key={p.id}
            img={p.imagenUrl} // tu backend devuelve esto
            title={p.nombre}
            price={`$${p.precio.toLocaleString()}`}
          />
        ))}
      </section>

      <Footer />
    </>
  );
};

export default Home;
