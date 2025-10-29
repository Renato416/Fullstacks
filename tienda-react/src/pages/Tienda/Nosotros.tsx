import React, { useEffect } from "react";
import Header from "../../components/Tienda/Header";
import Footer from "../../components/Tienda/Footer";
import "../../assets/CSS/Tienda/nosotros.css";
import "../../assets/CSS/Tienda/styles.css";

const Nosotros: React.FC = () => {

  useEffect(() => {
    const actualizarContadorCarrito = () => {
      const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
      const totalItems = carrito.reduce((acc: number, producto: any) => acc + producto.cantidad, 0);
      const contador = document.querySelector(".carrito-text");
      if (contador) {
        contador.textContent = `Productos (${totalItems})`;
      }
    };

    actualizarContadorCarrito();
    window.addEventListener("storage", actualizarContadorCarrito);

    return () => {
      window.removeEventListener("storage", actualizarContadorCarrito);
    };
  }, []);

  return (
    <>
      <Header />

      <main className="nosotros-container">
        <div className="nosotros-flex">
          {/* TEXTO */}
          <div className="nosotros-info">
            <h2>Sobre Nosotros</h2>
            <p>
              En <strong>LEVEL-UP GAMER</strong> somos una tienda dedicada a ofrecer los mejores productos y accesorios para gamers de todas las plataformas. 
              Desde nuestros inicios en 2020, hemos trabajado con pasión para brindar equipos de alto rendimiento, asesoría personalizada y una experiencia de compra única.
            </p>

            <h3>Nuestra Misión</h3>
            <p>
              Elevar la experiencia de juego de nuestros clientes, entregando productos de calidad, precios accesibles y un servicio confiable. 
              Creemos que cada jugador merece el mejor equipamiento para alcanzar su máximo potencial.
            </p>

            <h3>Nuestra Visión</h3>
            <p>
              Convertirnos en la tienda gamer número uno de Chile, reconocida por nuestra innovación, compromiso con la comunidad y atención personalizada.
            </p>
          </div>

          {/* IMAGEN */}
          <div className="nosotros-img">
            <img src="/assets/IMG/nosotros-banner.png" alt="Equipo LEVEL-UP GAMER" className="img-nosotros" />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Nosotros;
