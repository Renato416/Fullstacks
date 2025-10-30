import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../assets/CSS/VistaAdministradorTsxCSS/usuario.css";
import Logo from "../../assets/IMG/icon-level-up.png";
import { usuarios, actualizarUsuario } from "../../assets/data/data.ts";

export default function EditarUsuario() {
  const navigate = useNavigate();
  const { id } = useParams(); // obtenemos el id del usuario desde la URL

  const usuarioExistente = usuarios.find(u => u.id === id);

  const [nombre, setNombre] = useState(usuarioExistente?.nombre || "");
  const [email, setEmail] = useState(usuarioExistente?.email || "");
  const [edad, setEdad] = useState<number | "">(usuarioExistente?.edad || "");
  const [telefono, setTelefono] = useState(usuarioExistente?.telefono || "");
  const [direccion, setDireccion] = useState(usuarioExistente?.direccion || "");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!usuarioExistente) {
      navigate("/usuarios"); // si no existe el usuario, volvemos a la lista
    }
  }, [usuarioExistente, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !email || !edad || !telefono || !direccion) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (typeof edad === "number" && edad < 18) {
      setError("El usuario debe ser mayor de 18 años.");
      return;
    }

    actualizarUsuario(id!, { nombre, email, edad, telefono, direccion });

    navigate("/usuarios");
  };

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
          <Link className="nav-item active" to="/usuarios">Usuarios</Link>
          <Link className="nav-item" to="/reportes">Reportes</Link>
        </nav>

        

        <div className="sidebar-foot">
          <button
  className="btn-logout"
  onClick={() => {
    localStorage.removeItem("usuarioActivo"); // Borra la sesión
    navigate("/"); // Redirige a Home de la tienda
  }}
>
  Cerrar sesión
</button>

        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <h1>Editar Usuario</h1>
        </header>

        <section className="content">
          <form className="form-usuario" onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}

            <label>Nombre:</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label>Edad:</label>
            <input type="number" value={edad} onChange={(e) => setEdad(Number(e.target.value))} required />

            <label>Teléfono:</label>
            <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />

            <label>Dirección:</label>
            <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />

            <div className="form-buttons">
              <button type="submit" className="btn-add-user">Actualizar Usuario</button>
              <button type="button" className="btn-edit" onClick={() => navigate("/usuarios")}>Cancelar</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
