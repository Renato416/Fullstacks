import React from "react"; // npm install --save-dev @types/react @types/react-dom

import "../../assets/CSS/administrador/home_admin.css";

// Ajusta la ruta según tu estructura no funciona
const HomeAdmin: React.FC = () => {
  return (
    <div className="container">
      <aside className="sidebar">
        <div className="logo">
          <span>⚪</span> Company
        </div>
        <nav className="menu">
          <a href="#" className="active">
            📊 Dashboard
          </a>
          <a href="#">📁 Ordenes</a>
          <a href="#">📦 Inventario</a>
          <a href="#">📑 Reportes</a>
          <a href="#">👨‍💼 Empleados</a>
          <a href="#">👥 Clientes</a>
        </nav>

        <div className="bottom-menu">
          <a href="#">⚙️ Configuracion</a>
          <a href="#">🙍 Perfil</a>
          <a href="#">🔍 Search</a>
          <a href="#">❓ Help</a>
        </div>

        <div className="profile">
          <span>👤</span> Profile
        </div>
      </aside>

      <main className="main-content">
        <header className="main-header">
          <h1>¡HOLA Administrador!</h1>
          <div className="icons">🔔</div>
        </header>

        <section className="content-box">
          {/* Contenido adicional se puede colocar aquí */}
        </section>
      </main>
    </div>
  );
};

export default HomeAdmin;
