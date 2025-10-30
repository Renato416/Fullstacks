import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/CSS/VistaAdministradorTsxCSS/perfil.css";
import Logo from "../../assets/IMG/icon-level-up.png";

interface Usuario {
  nombre: string;
  email: string;
  rol: string;
  imagen?: string;
}

export default function Perfil() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true); // Control de carga

  useEffect(() => {
    const data = localStorage.getItem("usuarioActivo");

    if (!data) {
      // No hay usuario activo: redirigir a login
      navigate("/login-user");
    } else {
      const usuarioActivo: Usuario = JSON.parse(data);
      setUsuario(usuarioActivo);

      // Redirigir si no es admin
      if (usuarioActivo.rol !== "admin") {
        navigate("/tienda");
      }
    }

    setLoading(false);
  }, [navigate]);

  if (loading) {
    // Mostrar algo mientras valida
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "#fff" }}>
        Cargando usuario...
      </div>
    );
  }

  if (!usuario) return null; // Por seguridad

  return (
    <div className="admin-app">
      <aside className="sidebar">
        <div className="brand">
          <Link to="/dashboard">
            <img src={Logo} alt="Logo" className="logo" />
          </Link>
          <div className="brand-text">
            <div className="title">Level-Up Gamer</div>
          </div>
        </div>

        <nav className="nav">
          <Link className="nav-item" to="/dashboard">Dashboard</Link>
          <Link className="nav-item" to="/ordenes">Órdenes</Link>
          <Link className="nav-item" to="/productos">Productos</Link>
          <Link className="nav-item" to="/categorias">Categorías</Link>
          <Link className="nav-item" to="/usuarios">Usuarios</Link>
          <Link className="nav-item" to="/reportes">Reportes</Link>
        </nav>

        <div className="nav-extra">
          <Link className="nav-item active" to="/perfil">Perfil</Link>
          <Link className="nav-item" to="/tienda">Tienda</Link>
        </div>

        <div className="sidebar-foot">
          <button
            className="btn-logout"
            onClick={() => {
              localStorage.removeItem("usuarioActivo");
              navigate("/login-user");
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <h1>Vista Administrador - Perfil</h1>
        </header>

        <section className="content">
          <div className="profile-container">
            <div className="profile-image">
              <img src={usuario.imagen || Logo} alt="Foto de perfil" />
            </div>
            <div className="profile-info">
              <p><strong>Nombre:</strong> {usuario.nombre}</p>
              <p><strong>Correo:</strong> {usuario.email}</p>
              <p><strong>Rol:</strong> {usuario.rol}</p>
              <button className="btn-edit-profile">Editar Información</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
