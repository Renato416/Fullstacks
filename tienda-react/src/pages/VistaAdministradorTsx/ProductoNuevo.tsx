import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/CSS/VistaAdministradorTsxCSS/productos.css";
import "../../assets/CSS/VistaAdministradorTsxCSS/admin-layout.css";
import AdminSidebar from "../../components/administrador/AdminSidebar";

// 1. Usamos el servicio real
import { ProductoService } from "../../services/ProductoService";

export default function ProductoNuevo() {
  const navigate = useNavigate();

  // 2. Estas categorías coinciden con tu DataInitializer (Base de Datos)
  // Asignamos un ID a cada una para que el backend sepa dónde guardarlo.
  const categoriasDB = [
    { id: 1, nombre: "Accesorios" },
    { id: 2, nombre: "Muebles" },
    { id: 3, nombre: "Consolas" },
    { id: 4, nombre: "Monitores" },
    { id: 5, nombre: "Periféricos" },
  ];

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoriaSeleccionada || !nombre || !precio || !imagenUrl) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    try {
      setLoading(true);

      // Buscamos el objeto categoría completo basado en el nombre seleccionado
      const catObj = categoriasDB.find(
        (c) => c.nombre === categoriaSeleccionada
      );

      // 3. Creamos el objeto DTO para el Backend
      const nuevoProducto = {
        nombre: nombre,
        precio: Number(precio),
        imagenUrl: imagenUrl, // Enviamos la URL de texto
        nombreCategoria: categoriaSeleccionada,
        categoriaId: catObj ? catObj.id : 1, // Importante: Enviamos el ID real
        cantidad: 10, // Stock por defecto
      };

      // 4. Enviamos al Backend
      await ProductoService.create(nuevoProducto as any);

      alert("Producto agregado correctamente a la Base de Datos ✅");
      navigate("/productos");
    } catch (error) {
      console.error("Error creando producto:", error);
      alert("Hubo un error al guardar el producto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-app">
      <AdminSidebar activePage="productos" />
      <main className="main">
        <header className="topbar">
          <h1>Agregar Nuevo Producto</h1>
        </header>

        <section className="content container mt-4">
          <form className="form-producto row g-3" onSubmit={handleSubmit}>
            {/* SELECT CATEGORÍA */}
            <div className="col-12">
              <label className="form-label">Categoría:</label>
              <select
                className="form-select"
                value={categoriaSeleccionada}
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                required
              >
                <option value="">--Selecciona categoría--</option>
                {categoriasDB.map((cat) => (
                  <option key={cat.id} value={cat.nombre}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* INPUT IMAGEN (URL) */}
            <div className="col-12">
              <label className="form-label">Imagen (URL):</label>
              <input
                type="text"
                placeholder="Ej: https://i.imgur.com/foto.jpg"
                className="form-control"
                value={imagenUrl}
                onChange={(e) => setImagenUrl(e.target.value)}
                required
              />
              {/* Previsualización pequeña */}
              {imagenUrl && (
                <div className="mt-2">
                  <img
                    src={imagenUrl}
                    alt="Vista previa"
                    style={{ height: "80px", borderRadius: "5px" }}
                    onError={(e) =>
                      ((e.target as HTMLImageElement).style.display = "none")
                    }
                  />
                </div>
              )}
            </div>

            {/* NOMBRE */}
            <div className="col-md-6">
              <label className="form-label">Nombre:</label>
              <input
                type="text"
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            {/* PRECIO */}
            <div className="col-md-6">
              <label className="form-label">Precio:</label>
              <input
                type="number"
                className="form-control"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                required
                min="1"
              />
            </div>

            {/* BOTONES */}
            <div className="col-12 d-flex gap-2">
              <button
                type="submit"
                className="btn-add-user btn btn-primary"
                disabled={loading}
              >
                {loading ? "Guardando..." : "Agregar Producto"}
              </button>
              <button
                type="button"
                className="btn-edit btn btn-secondary"
                onClick={() => navigate("/productos")}
              >
                Cancelar
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
