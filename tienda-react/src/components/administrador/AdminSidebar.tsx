import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/IMG/icon-level-up.png";
import "../../assets/CSS/VistaAdministradorTsxCSS/admin-layout.css";

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
        <Link to="/dashboard" style={{ display: 'contents' }}>
            <img src={Logo} alt="Logo" className="logo" />
            <div className="brand-text">
            <div className="title">Level-Up Gamer</div>
            </div>
        </Link>
      </div>

      <nav className="nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            className={`nav-item ${
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

      <div className="sidebar-foot">
        <button
          className="btn-logout"
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