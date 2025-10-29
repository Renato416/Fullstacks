import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../CSS/listaproducto.css";
import "../../CSS/styles.css";

const Header: React.FC = () => {
  const [totalProductos, setTotalProductos] = useState(0);
  const [menuActivo, setMenuActivo] = useState(false);

  // Función para actualizar el contador del carrito
  const actualizarContadorCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    const total = carrito.reduce((acc: number, prod: any) => acc + prod.cantidad, 0);
    setTotalProductos(total);
  };

  // Ejecuta al montar el componente
  useEffect(() => {
    actualizarContadorCarrito();
    // Opcional: escuchar cambios en localStorage si deseas sincronizar entre pestañas
    window.addEventListener("storage", actualizarContadorCarrito);
    return () => {
      window.removeEventListener("storage", actualizarContadorCarrito);
    };
  }, []);

  return (
    <header className="Header">
      <div className="Logo-container">
        <Link to="/">
          <img src="/assets/IMG/icon-level-up.png" alt="Logo de la empresa" className="Logo" />
        </Link>
        <h1 className="Nombre-empresa">LEVEL-UP GAMER</h1>
      </div>

      {/* Botón hamburguesa para móvil */}
      <button className="nav-toggle" onClick={() => setMenuActivo(!menuActivo)}>
        ☰
      </button>

      <nav className={`nav ${menuActivo ? "active" : ""}`}>
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/nosotros">Nosotros</Link>
        <Link to="/blog">Blogs</Link>
        <Link to="/contacto">Contactos</Link>
      </nav>

      <div className="Carrito">
        <button className="button-carrito">
          <span className="carrito-text">Productos ({totalProductos})</span>
          <Link to="/carrito_compras">
            <img src="/assets/IMG/carrito-icon.png" alt="Icono del carrito" className="icono-carrito" />
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
