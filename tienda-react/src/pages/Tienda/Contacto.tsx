import React, { useEffect } from "react";
import Header from "../../components/Tienda/Header";
import "../../CSS/contacto.css";

const Contacto: React.FC = () => {

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

      <div className="empresa">
        <div className="empresa-logo">
          <img src="/assets/IMG/icon-level-up.png" alt="Logo de la empresa" className="Logo" />
        </div>
        <h2>LEVEL-UP GAMER</h2>
      </div>

      <div className="info-contacto">
        <h3>INFORMACIÓN DE CONTACTO</h3>
        <p><strong>Teléfono:</strong> +56 9 8765 4321</p>
        <p><strong>Correo electrónico:</strong> soporte@levelupgamer.cl</p>
        <p><strong>Dirección:</strong> Av. Los Jugadores 1234, Santiago, Chile</p>
        <p><strong>Horario de atención:</strong><br />
           Lunes a Viernes: 9:00 AM - 8:00 PM<br />
           Sábados: 10:00 AM - 6:00 PM<br />
           Domingos: Cerrado
        </p>

        <div className="redes-sociales">
          <h4>Síguenos en redes sociales</h4>
          <ul>
            <li><a href="#" target="_blank" rel="noopener noreferrer">Facebook: LevelUpGamerCL</a></li>
            <li><a href="#" target="_blank" rel="noopener noreferrer">Instagram: @levelup_gamer</a></li>
            <li><a href="#" target="_blank" rel="noopener noreferrer">Twitter (X): @LevelUpGamer</a></li>
            <li><a href="#" target="_blank" rel="noopener noreferrer">TikTok: @levelupgamer.oficial</a></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Contacto;
