import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/CSS/Tienda/styles.css";
import Logo from "../../assets/IMG/icon-level-up.png";
import Carr from "../../assets/IMG/carrito-icon.png";

interface Usuario {
  id: string;
  nombre: string;
  rol: "admin" | "cliente";
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [totalProductos, setTotalProductos] = useState(0);
  const [menuActivo, setMenuActivo] = useState(false);
  const [usuarioActivo, setUsuarioActivo] = useState<Usuario | null>(null);

  useEffect(() => {
    const usuario = localStorage.getItem("usuarioActivo");
    if (usuario) setUsuarioActivo(JSON.parse(usuario));
  }, []);

  const actualizarContadorCarrito = async () => {
    if (!usuarioActivo || usuarioActivo.rol !== "cliente") {
      setTotalProductos(0);
      return;
    }
    try {
      const response = await axios.get(`/api/v2/carritos/usuario/${usuarioActivo.id}`);
      const carritoBackend: { id: string; cantidad: number }[] =
        response.data._embedded?.carritoDTOList || [];
      const total = carritoBackend.reduce((acc, p) => acc + p.cantidad, 0);
      setTotalProductos(total);
    } catch (error) {
      console.error("Error al obtener carrito:", error);
      setTotalProductos(0);
    }
  };

  useEffect(() => {
    actualizarContadorCarrito();
    const intervalo = setInterval(actualizarContadorCarrito, 5000);
    return () => clearInterval(intervalo);
  }, [usuarioActivo]);

  const handleLogout = () => {
    localStorage.removeItem("usuarioActivo");
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
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
        {/* Carrito siempre visible */}
        <Link to="/carrito_compras" className="button-carrito">
          <span className="carrito-text">Productos ({totalProductos})</span>
          <img src={Carr} alt="Icono del carrito" className="icono-carrito" />
        </Link>

        <div className="user-buttons">
          {usuarioActivo ? (
            <button className="btn-logout" onClick={handleLogout}>
              Cerrar sesión
            </button>
          ) : (
            <>
              <Link to="/login" className="btn-login">Inicio de sesión</Link>
              <Link to="/register" className="btn-register">Registrar usuario</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
