import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Tienda/Header";
import Footer from "../../components/Tienda/Footer";

const Noticia2: React.FC = () => {
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
        <h2>Evento “LEVEL-UP EXPERIENCE”</h2>
        <img
          src="/assets/IMG-NOTICIAS/evento-gamer.jpg"
          alt="Evento gamer"
          className="detalle-img"
        />
        <p>
          ¡Prepárate para vivir la experiencia gamer definitiva! Este sábado, te esperamos en nuestra tienda principal
          para el primer evento “LEVEL-UP EXPERIENCE”. Tendrás la oportunidad de probar los últimos productos gaming,
          participar en torneos, y conocer a influencers del mundo gamer.
        </p>
        <p>
          La entrada es gratuita y los primeros 50 visitantes recibirán un regalo sorpresa. ¡No te lo pierdas!
        </p>

        <Link to="/blog" className="boton-volver">
          ⬅ Volver a Noticias
        </Link>
      </main>

      <Footer />
    </>
  );
};

export default Noticia2;
