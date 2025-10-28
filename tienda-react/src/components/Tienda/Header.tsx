import React, { useEffect, useState } from "react";
import logo from "../assets/IMG/icon-level-up.png";
import carritoIcon from "../assets/IMG/carrito-icon.png";

interface HeaderProps {
  carritoCount?: number; // opcional, si se pasa se usa, sino se calcula desde localStorage
}

export const Header: React.FC<HeaderProps> = ({ carritoCount }) => {
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (typeof carritoCount === "number") {
      setTotalItems(carritoCount);
    } else {
      const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
      const total = carrito.reduce(
        (acc: number, producto: { cantidad: number }) => acc + producto.cantidad,
        0
      );
      setTotalItems(total);
    }
  }, [carritoCount]);

  return (
    <header className="Header">
      <div className="Logo-container">
        <a href="/">
          <img src={logo} alt="Logo de la empresa" className="Logo" />
        </a>
        <h1 className="Nombre-empresa">LEVEL-UP GAMER</h1>
      </div>
      <nav className="nav">
        <a href="/">Inicio</a>
        <a href="/listaProducto">Productos</a>
        <a href="#">Nosotros</a>
        <a href="/blog">Blogs</a>
        <a href="/contacto">Contactos</a>
      </nav>
      <div className="Carrito">
        <button className="button-carrito">
          <span className="carrito-text">Productos ({totalItems})</span>
          <a href="/carrito_compras">
            <img src={carritoIcon} alt="Icono del carrito" className="icono-carrito" />
          </a>
        </button>
        <div className="inicio-registrar">
          <a href="/LoginUser" className="InicioLink">
            Inicio de sesión
          </a>
          <a href="/UserRegister" className="InicioLink">
            Registrar usuario
          </a>
        </div>
      </div>
    </header>
  );
};
