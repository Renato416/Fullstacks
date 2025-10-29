import React from "react";
import { Link } from "react-router-dom";
//import "../../assets/CSS/administrador/home_admin.css";

export const HomeAdmin: React.FC = () => {
  return (
    <div className="container-fluid home-admin-container">
      <div className="row g-0">
        <aside className="col-md-3 col-lg-2 sidebar d-flex flex-column">
          <div className="logo d-flex align-items-center mb-4">
            <img
              src="/VistaTienda/IMG/icon-level-up.png"
              alt="Logo Level-Up"
              className="me-2"
            />
            <span>Level-Up</span>
          </div>

          <nav className="menu flex-grow-1">
            <Link to="/" className="active">📊 Dashboard</Link>
            <Link to="/inventario">📦 Inventario</Link>
            <Link to="#">📑 Reportes</Link>
            <Link to="/usuarios">👨‍💼 Empleados</Link>
            <Link to="#">👥 Clientes</Link>
          </nav>

          <div className="bottom-menu mt-auto">
            <Link to="#">⚙️ Configuración</Link>
            <Link to="#">🙍 Perfil</Link>
            <Link to="#">❓ Help</Link>
          </div>

          <div className="profile text-center mt-3">
            <span>👤</span> Profile
          </div>
        </aside>

        <main className="col-md-9 col-lg-10 main-content">
          <header className="main-header d-flex justify-content-between align-items-center">
            <h1>¡HOLA Administrador!</h1>
            <div className="icons">🔔</div>
          </header>

          <section className="content-box mt-4">
            {/* Contenido dinámico del dashboard aquí */}
          </section>
        </main>
      </div>
    </div>
  );
};
