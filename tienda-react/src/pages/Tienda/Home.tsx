import React from "react";
import Header from "../../components/Tienda/Header";
import Footer from "../../components/Tienda/Footer";
import ProductCard from "../../components/Tienda/ProductoCard";
import { productos } from "../../assets/data/data";
import type { Producto } from "../../assets/data/data";
import "../../assets/CSS/Tienda/styles.css";

const Home: React.FC = () => {
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
            img={`/assets/IMG/${p.imagen}`} // ruta base + nombre del archivo
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
