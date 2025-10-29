import React from "react";
import Header from "../../components/Tienda/Header";
import Footer from "../../components/Tienda/Footer";
import type { Producto } from "../../assets/data/data";

// Importamos los productos desde la base de datos
import { productos } from "../../assets/data/data";

// Estilos
import "../../assets/CSS/Tienda/styles.css";

interface ProductCardProps {
  img: string;
  title: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ img, title, price }) => {
  return (
    <div className="producto">
      <img src={img} alt={title} className="producto-img" />
      <div className="producto-titulo">{title}</div>
      <div className="producto-valor">{price}</div>
    </div>
  );
};

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
            img={p.imagen} // la ruta ya está completa en data.ts
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
