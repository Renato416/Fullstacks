import React from "react";
import { Link, useNavigate } from "react-router-dom";
//import "../../assets/CSS/administrador/registro_producto.css";

export const RegisterProduct: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const nuevoProducto = {
      nombre: formData.get("nombre")?.toString().trim() || "",
      sku: formData.get("sku")?.toString().trim() || "",
      categoria: formData.get("categoria")?.toString().trim() || "",
      precio: parseFloat(formData.get("precio")?.toString() || "0"),
      stock: parseInt(formData.get("stock")?.toString() || "0"),
      descripcion: formData.get("descripcion")?.toString().trim() || "",
      proveedores: Array.from(formData.getAll("proveedores")).map(v => v.toString()),
      ubicacion: Array.from(formData.getAll("ubicacion")).map(v => v.toString()),
      fecha: new Date().toISOString().slice(0, 10)
    };

    const productos = JSON.parse(localStorage.getItem("productos") || "[]");
    productos.push(nuevoProducto);
    localStorage.setItem("productos", JSON.stringify(productos));

    alert("Producto agregado con éxito ✅");
    navigate("/inventario");
  };

  return (
    <div className="product-register-container">
      <aside className="sidebar">
        <div className="logo">
          <img src="/VistaTienda/IMG/icon-level-up.png" alt="Logo" />Level-Up
        </div>

        <nav className="menu">
          <Link to="/">📊 Dashboard</Link>
          <Link to="/inventario" className="active">📦 Productos</Link>
          <Link to="#">📑 Reportes</Link>
          <Link to="/usuarios">👨‍💼 Empleados</Link>
          <Link to="#">👥 Clientes</Link>
        </nav>

        <div className="bottom-menu">
          <Link to="#">⚙️ Configuración</Link>
          <Link to="#">🙍 Perfil</Link>
          <Link to="#">❓ Help</Link>
        </div>

        <div className="profile">
          <span>👤</span> Admin
        </div>
      </aside>

      <main className="main">
        <div className="header">
          <h1>NUEVO PRODUCTO</h1>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h3>Registro de producto</h3>

            <label htmlFor="nombre">Nombre del producto</label>
            <input type="text" id="nombre" name="nombre" required />

            <label htmlFor="sku">SKU (código)</label>
            <input type="text" id="sku" name="sku" required />

            <label htmlFor="categoria">Categoría</label>
            <input type="text" id="categoria" name="categoria" required />

            <label htmlFor="precio">Precio</label>
            <input type="number" id="precio" name="precio" step="0.01" min="0" required />

            <label htmlFor="stock">Stock</label>
            <input type="number" id="stock" name="stock" min="0" required />

            <label htmlFor="descripcion">Descripción (opcional)</label>
            <textarea id="descripcion" name="descripcion" rows={3}></textarea>

            <div className="select-row">
              <div>
                <label htmlFor="proveedores">Proveedores</label>
                <select id="proveedores" name="proveedores" size={4} multiple>
                  <option>Proveedor A</option>
                  <option>Proveedor B</option>
                  <option>Proveedor C</option>
                  <option>Proveedor D</option>
                </select>
              </div>

              <div>
                <label htmlFor="ubicacion">Ubicación / Almacén</label>
                <select id="ubicacion" name="ubicacion" size={4} multiple>
                  <option>Bodega Central</option>
                  <option>Almacén Norte</option>
                  <option>Almacén Sur</option>
                  <option>Mostrador</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn-submit">AGREGAR PRODUCTO</button>
          </form>
        </div>
      </main>
    </div>
  );
};
