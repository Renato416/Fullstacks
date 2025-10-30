import React from "react";
import Header from "../../components/Tienda/Header";
import Footer from "../../components/Tienda/Footer";
import "../../assets/CSS/Tienda/styles.css";
import "../../assets/CSS/Tienda/contacto.css";

const Contacto: React.FC = () => {
  return (
    <>
      <Header />

      {/* Título principal */}
      <section className="titulo-ofertas">
        <h2>CONTÁCTANOS</h2>
      </section>

      {/* Información de contacto */}
      <section className="contacto-container">
        <div className="empresa">
          <div className="empresa-logo">
            <img
              src="/assets/IMG/icon-level-up.png"
              alt="Logo de la empresa"
              className="Logo"
            />
          </div>
          <h2 className="empresa-nombre">LEVEL-UP GAMER</h2>
        </div>

        <div className="info-contacto">
          <h3>INFORMACIÓN DE CONTACTO</h3>

          <ul className="contacto-lista">
            <li>
              <strong>Teléfono:</strong> +56 9 8765 4321
            </li>
            <li>
              <strong>Correo electrónico:</strong> soporte@levelupgamer.cl
            </li>
            <li>
              <strong>Dirección:</strong> Av. Los Jugadores 1234, Santiago, Chile
            </li>
            <li>
              <strong>Horario de atención:</strong>
              <br />
              Lunes a Viernes: 9:00 AM - 8:00 PM
              <br />
              Sábados: 10:00 AM - 6:00 PM
              <br />
              Domingos: Cerrado
            </li>
          </ul>
        </div>

        <div className="redes-sociales">
          <h3>SÍGUENOS EN REDES SOCIALES</h3>
          <ul>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                Facebook: LevelUpGamerCL
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                Instagram: @levelup_gamer
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                Twitter (X): @LevelUpGamer
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                TikTok: @levelupgamer.oficial
              </a>
            </li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contacto;
