import React from "react";
import lupaIcon from "../assets/IMG/Lupa.png";

export const Busqueda: React.FC = () => {
  return (
    <section className="busqueda-container">
      <input type="text" placeholder="Buscar productos..." className="busqueda-input" />
      <button className="busqueda-boton">
        <img src={lupaIcon} alt="Buscar" className="icono-lupa" />
      </button>
    </section>
  );
};
