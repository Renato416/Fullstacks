import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Tienda/Header";
import Footer from "../../components/Tienda/Footer";

const Noticia1: React.FC = () => {
  useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    const totalItems = carrito.reduce((acc: number, producto: any) => acc + producto.cantidad, 0);
    const contador = document.querySelector(".carrito-text");
    if (contador) contador.textContent = `Productos (${totalItems})`;
  }, []);

  return (
    <>
      <Header />

      <main className="noticia-detalle">
        <h2>¡Semana de Ofertas Gamer!</h2>
        <img
          src="/assets/IMG-NOTICIAS/ofertas-gamer.jpg"
          alt="Ofertas gamer"
          className="detalle-img"
        />
        <p>
          Desde este lunes hasta el domingo, disfruta de descuentos exclusivos de hasta un 40% en artículos seleccionados.
          Encuentra monitores, teclados mecánicos, sillas ergonómicas y más, todo con garantía LEVEL-UP.
        </p>
        <p>
          Aprovecha nuestras promociones en tienda física y online, con despacho gratis en compras sobre $50.000.
          ¡No te lo pierdas y lleva tu setup al siguiente nivel!
        </p>

        <Link to="/blog" className="boton-volver">
          ⬅ Volver a Noticias
        </Link>
      </main>

      <Footer />
    </>
  );
};

export default Noticia1;
