import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-nombre-div">
        <h2 className="footer-nombre-h2">LEVEL-UP GAMER</h2>
      </div>
      <div className="footer-enlaces">
        <a href="#">Categoria x</a>
        <a href="#">Categoria y</a>
        <a href="#">Categoria z</a>
      </div>
      <div className="footer-suscripcion">
        <input type="email" placeholder="Ingresa tu Gmail" className="ingresar-gmail" />
        <button className="button-gmail">Submit</button>
      </div>
    </footer>
  );
};
