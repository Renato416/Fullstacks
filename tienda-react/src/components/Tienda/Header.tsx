import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/CSS/Tienda/styles.css";
import Logo from "../../assets/IMG/icon-level-up.png";
import Carr from "../../assets/IMG/carrito-icon.png";

interface Usuario {
  id: string;
  nombre: string;
  rol: "admin" | "cliente";
}

interface ProductoCarrito {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
}

const STORAGE_KEY = "carrito";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [totalProductos, setTotalProductos] = useState(0);
  const [menuActivo, setMenuActivo] = useState(false);
  const [usuarioActivo, setUsuarioActivo] = useState<Usuario | null>(null);

  /* 🔐 Usuario activo */
  useEffect(() => {
    const usuario = localStorage.getItem("usuarioActivo");
    if (usuario) setUsuarioActivo(JSON.parse(usuario));
  }, []);

  /* 🛒 Calcular total desde localStorage */
  const calcularTotalCarrito = () => {
    if (!usuarioActivo || usuarioActivo.rol !== "cliente") {
      setTotalProductos(0);
      return;
    }

    const carritoGuardado = localStorage.getItem(STORAGE_KEY);
    const carrito: ProductoCarrito[] = carritoGuardado
      ? JSON.parse(carritoGuardado)
      : [];

    const total = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    setTotalProductos(total);
  };

  /* 🔄 Escuchar cambios del carrito */
  useEffect(() => {
    calcularTotalCarrito();

    const actualizar = () => calcularTotalCarrito();
    window.addEventListener("carrito-actualizado", actualizar);

    return () => window.removeEventListener("carrito-actualizado", actualizar);
  }, [usuarioActivo]);

  /* 🚪 Logout */
  const handleLogout = () => {
    localStorage.removeItem("usuarioActivo");
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    localStorage.removeItem(STORAGE_KEY);
    setUsuarioActivo(null);
    setTotalProductos(0);
    navigate("/");
  };

  return (
    <header>
      <div className="Logo-container">
        <Link to="/">
          <img src={Logo} alt="Logo de la empresa" className="Logo" />
        </Link>
        <h1 className="Nombre-empresa">LEVEL-UP GAMER</h1>
      </div>

      <button
        className="nav-toggle"
        onClick={() => setMenuActivo(!menuActivo)}
      >
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
        {/* 🛒 Carrito local */}
        <Link to="/carrito_compras" className="button-carrito">
          <span className="carrito-text">
            Productos ({totalProductos})
          </span>
          <img src={Carr} alt="Icono del carrito" className="icono-carrito" />
        </Link>

        <div className="user-buttons">
          {usuarioActivo ? (
            <button className="btn-logout" onClick={handleLogout}>
              Cerrar sesión
            </button>
          ) : (
            <>
              <Link to="/login" className="btn-login">
                Inicio de sesión
              </Link>
              <Link to="/register" className="btn-register">
                Registrar usuario
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
