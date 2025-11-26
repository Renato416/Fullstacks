import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../assets/CSS/VistaAdministradorTsxCSS/EditarProducto.css";

// 1. Usamos el servicio real
import { ProductoService } from "../../services/ProductoService";
import type { Producto } from "../../assets/data/data";

const EditarProducto: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<Producto>({
    id: "",
    categoria: "",
    nombre: "",
    precio: 0,
    imagen: "",
  });

  // 2. Cargar los datos del producto real al entrar
  useEffect(() => {
    if (id) {
      cargarProducto(id);
    }
  }, [id]);

  const cargarProducto = async (productoId: string) => {
    try {
      setLoading(true);
      // Llamada al Backend: GET /api/v2/productos/{id}
      const data = await ProductoService.getById(productoId);
      
      // AJUSTE DE MAPEO (Backend -> Formulario)
      setFormData({
        id: String(data.id),
        nombre: data.nombre,
        precio: data.precio,
        // El backend manda "imagenUrl", el form usa "imagen"
        imagen: data.imagenUrl || data.imagen || "",
        // El backend manda "nombreCategoria", el form usa "categoria"
        categoria: data.nombreCategoria || data.categoria || ""
      });
      
    } catch (err) {
      console.error("Error cargando producto:", err);
      setError("No se pudo encontrar el producto en la base de datos.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "precio" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nombre.trim()) {
      alert("El nombre del producto no puede estar vacío");
      return;
    }

    try {
      // AJUSTE DE MAPEO (Formulario -> Backend)
      // Preparamos el objeto tal como lo espera el DTO de Java
      const payloadBackend = {
        nombre: formData.nombre,
        precio: formData.precio,
        imagenUrl: formData.imagen, // Devolvemos el nombre correcto al backend
        nombreCategoria: formData.categoria,
        categoriaId: 1 // IMPORTANTE: Por ahora hardcodeamos ID 1 para que no falle si tu backend pide ID.
                       // (Idealmente deberías cargar la lista de categorías y dejar elegir el ID)
      };

      // Llamada al Backend: PUT /api/v2/productos/{id}
      if (id) {
        await ProductoService.update(id, payloadBackend as any);
        alert("Producto actualizado con éxito en la Base de Datos ✅");
        navigate("/productos");
      }
    } catch (err) {
      console.error("Error actualizando:", err);
      alert("Error al actualizar. Revisa la consola.");
    }
  };

  if (loading) return <div className="container mt-5 text-center">Cargando datos del producto...</div>;
  if (error) return <div className="container mt-5 text-center text-danger">{error}</div>;

  return (
    <div className="editar-producto-container container mt-4">
      <h2 className="mb-3">Editar Producto</h2>
      
      <form onSubmit={handleSubmit} className="editar-producto-form row g-3">
        <div className="col-md-6">
          <label className="form-label">
            ID (No editable):
            <input type="text" value={formData.id} name="id" readOnly className="form-control" disabled />
          </label>
        </div>

        <div className="col-md-6">
          <label className="form-label">
            Nombre:
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="form-control"
              required
            />
          </label>
        </div>

        <div className="col-md-6">
          <label className="form-label">
            Categoría (Nombre):
            <input
              type="text"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              className="form-control"
              required
            />
          </label>
        </div>

        <div className="col-md-6">
          <label className="form-label">
            Precio:
            <input
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              className="form-control"
              required
            />
          </label>
        </div>

        <div className="col-12">
          <label className="form-label">
            Imagen (URL):
            <input
              type="text"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
              className="form-control"
            />
          </label>
          {/* Previsualización de la imagen */}
          {formData.imagen && (
            <div className="mt-2">
                <img src={formData.imagen} alt="Previsualización" style={{height: '100px', objectFit: 'contain'}} 
                     onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}/>
            </div>
          )}
        </div>

        <div className="col-12 d-flex gap-2 mt-3">
          <button type="submit" className="btn btn-primary">
            Guardar Cambios
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/productos")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarProducto;