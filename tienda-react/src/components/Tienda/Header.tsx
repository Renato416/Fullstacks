import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/CSS/Tienda/styles.css";
import Logo from "../../assets/IMG/icon-level-up.png";
import Carr from "../../assets/IMG/carrito-icon.png";

const Header: React.FC = () => {
  const [totalProductos, setTotalProductos] = useState(0);
  const [menuActivo, setMenuActivo] = useState(false);

  // 🔹 Función para actualizar el contador del carrito
  const actualizarContadorCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    const total = carrito.reduce((acc: number, prod: any) => acc + prod.cantidad, 0);
    setTotalProductos(total);
  };

  useEffect(() => {
    actualizarContadorCarrito();

    // 🔹 Escuchar cambios en localStorage desde otras pestañas
    const handleStorage = () => actualizarContadorCarrito();
    window.addEventListener("storage", handleStorage);

    // 🔹 Intervalo para actualizar en la misma pestaña cada 200ms
    const intervalo = setInterval(actualizarContadorCarrito, 200);

    return () => {
      window.removeEventListener("storage", handleStorage);
      clearInterval(intervalo);
    };
  }, []);

  return (
    <header>
      <div className="Logo-container">
        <Link to="/">
          <img src={Logo} alt="Logo de la empresa" className="Logo" />
        </Link>
        <h1 className="Nombre-empresa">LEVEL-UP GAMER</h1>
      </div>

      <button className="nav-toggle" onClick={() => setMenuActivo(!menuActivo)}>
        ☰
      </button>

      <nav className={`nav ${menuActivo ? "active" : ""}`}>
        <Link to="/">Inicio</Link>
        <Link to="/listaproductos">Productos</Link>
        <Link to="/nosotros">Nosotros</Link>
        <Link to="/blog">Blogs</Link>
        <Link to="/contacto">Contactos</Link>
      </nav>

      <div className="Carrito">
        <button className="button-carrito">
          <span className="carrito-text">Productos ({totalProductos})</span>
          <Link to="/carrito_compras">
            <img src={Carr} alt="Icono del carrito" className="icono-carrito" />
          </Link>
        </button>

        <div className="user-buttons">
          <Link to="/login" className="btn-login">Inicio de sesión</Link>
          <Link to="/register" className="btn-register">Registrar usuario</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
