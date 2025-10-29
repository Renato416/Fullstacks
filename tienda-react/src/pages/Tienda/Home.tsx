import React from "react";
import Header from "../../components/Tienda/Header";
import Footer from "../../components/Tienda/Footer";
import ProductCard from "../../components/Tienda/ProductoCard";

const products = [
  { img: "/assets/IMG/silla.jpeg", title: "Silla Gamer", price: "$72.990" },
  { img: "/assets/IMG/Mando.webp", title: "Mando Xbox", price: "$79.990" },
  { img: "/assets/IMG/Escritorio.webp", title: "Escritorio Gamer", price: "$70.990" },
  { img: "/assets/IMG/audifonos.jpeg", title: "Audífonos con micrófono", price: "$64.990" },
  { img: "/assets/IMG/Teclado.webp", title: "Teclado Gamer", price: "$15.990" },
  { img: "/assets/IMG/Mause.webp", title: "Mouse Gamer", price: "$28.990" },
  { img: "/assets/IMG/monitor.jpeg", title: "Monitor Gamer", price: "$134.990" },
  { img: "/assets/IMG/mausepad.avif", title: "Mouse Pad", price: "$6.990" },
];

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <section className="titulo-ofertas">
        <h2>¡LAS MEJORES OFERTAS!</h2>
      </section>

      <section className="productos-container">
        {products.map((p, index) => (
          <ProductCard key={index} img={p.img} title={p.title} price={p.price} />
        ))}
      </section>

      <Footer />
    </>
  );
};

export default Home;
