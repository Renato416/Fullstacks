import React from "react";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-nombre-div">
        <h2 className="footer-nombre-h2">SERVICIO AL CLIENTE</h2>
        <p><strong>Teléfono:</strong> +56 9 3456 7890</p>
        <p><strong>Correo:</strong> soporte@levelupgamer.cl</p>
        <p><strong>Horario de atención:</strong> Lunes a Viernes de 9:00 a 19:00 hrs</p>
      </div>
      <div className="footer-redes">
        <p>Síguenos en:</p>
        <a href="#" target="_blank">Facebook</a> |
        <a href="#" target="_blank">Instagram</a> |
        <a href="#" target="_blank">Twitter (X)</a>
      </div>
    </footer>
  );
};

export default Footer;
