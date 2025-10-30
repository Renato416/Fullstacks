import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/CSS/VistaAdministradorTsxCSS/productos.css";
import Logo from "../../assets/IMG/icon-level-up.png";
import { agregarProducto } from "../../assets/data/data";

export default function ProductoNuevo() {
  const navigate = useNavigate();

  const categorias = [
    "Accesorios",
    "Sillas Gamer",
    "Computadores Gamers",
    "Mouse",
    "Mousepad",
    "Monitores",
    "Teclado"
  ];

  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState<File | null>(null);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoria || !nombre || !precio) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    const nuevoProducto = {
      id: "P" + Date.now(),
      categoria,
      nombre,
      precio: Number(precio),
      imagen: imagen ? URL.createObjectURL(imagen) : "/assets/IMG/default.webp",
    };

    agregarProducto(nuevoProducto);
    alert("Producto agregado correctamente.");
    navigate("/productos");
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
          <Link className="nav-item active" to="/productos">Productos</Link>
          <Link className="nav-item" to="/categorias">Categorías</Link>
          <Link className="nav-item" to="/usuarios">Usuarios</Link>
          <Link className="nav-item" to="/reportes">Reportes</Link>
        </nav>
        <div className="nav-extra">
          <Link className="nav-item" to="/perfil">Perfil</Link>
          <Link className="nav-item" to="#">Tienda</Link>
        </div>
        <div className="sidebar-foot">
          <button className="btn-logout">Cerrar sesión</button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <h1>Agregar Nuevo Producto</h1>
        </header>

        <section className="content">
          <form className="form-producto" onSubmit={handleSubmit}>
            <label>Categoría:</label>
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              <option value="">--Selecciona categoría--</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <label>Imagen:</label>
            <input type="file" accept="image/*" onChange={(e) => setImagen(e.target.files ? e.target.files[0] : null)} />

            <label>Nombre:</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />

            <label>Precio:</label>
            <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} />

            <div className="form-buttons">
              <button type="submit" className="btn-add-user">Agregar Producto</button>
              <button type="button" className="btn-edit" onClick={() => navigate("/productos")}>Cancelar</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
