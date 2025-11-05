import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/IMG/icon-level-up.png";
import "../../assets/CSS/VistaAdministradorTsxCSS/admin-layout.css";

// Definimos las props que acepta el componente
interface AdminSidebarProps {
  activePage?: string;
}

export default function AdminSidebar({ activePage }: AdminSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Órdenes", path: "/ordenes" },
    { name: "Productos", path: "/productos" },
    { name: "Categorías", path: "/categorias" },
    { name: "Usuarios", path: "/usuarios" },
    { name: "Reportes", path: "/reportes" },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <Link to="/dashboard">
          <img src={Logo} alt="Logo" className="logo img-fluid" />
        </Link>
        <div className="brand-text">
          <div className="title">Level-Up Gamer</div>
        </div>
      </div>

      <nav className="nav flex-column">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            className={`nav-item nav-link ${
              location.pathname === item.path || activePage === item.name.toLowerCase()
                ? "active"
                : ""
            }`}
            to={item.path}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="sidebar-foot mt-auto">
        <button
          className="btn btn-danger w-100"
          onClick={() => {
            localStorage.removeItem("usuarioActivo");
            navigate("/");
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
