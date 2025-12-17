import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../assets/CSS/VistaAdministradorTsxCSS/EditarProducto.css";

// Servicio
import { ProductoService } from "../../services/ProductoService";
import type { Producto } from "../../assets/data/data";

const EditarProducto: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔹 Estado inicial con CANTIDAD
  const [formData, setFormData] = useState<Producto>({
    id: "",
    categoria: "",
    nombre: "",
    precio: 0,
    cantidad: 0,
    imagenUrl: "",
  });

  // 🔹 Cargar producto
  useEffect(() => {
    if (id) {
      cargarProducto(id);
    }
  }, [id]);

  const cargarProducto = async (productoId: string) => {
    try {
      setLoading(true);
      const data = await ProductoService.getById(productoId);

      setFormData({
        id: String(data.id),
        nombre: data.nombre,
        precio: data.precio,
        cantidad: data.cantidad ?? 0,
        imagenUrl: data.imagenUrl || data.imagen || "",
        categoria: data.nombreCategoria || data.categoria || "",
      });
    } catch (err) {
      console.error("Error cargando producto:", err);
      setError("No se pudo encontrar el producto en la base de datos.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Manejo de cambios
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "precio" || name === "cantidad"
          ? Number(value)
          : value,
    }));
  };

  // 🔹 Envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombre.trim()) {
      alert("El nombre del producto no puede estar vacío");
      return;
    }

    try {
      const payloadBackend = {
        nombre: formData.nombre,
        precio: formData.precio,
        cantidad: formData.cantidad,
        imagenUrl: formData.imagenUrl,
        nombreCategoria: formData.categoria,
      };

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

  if (loading)
    return (
      <div className="container mt-5 text-center">
        Cargando datos del producto...
      </div>
    );

  if (error)
    return (
      <div className="container mt-5 text-center text-danger">
        {error}
      </div>
    );

  return (
    <div className="editar-producto-container container mt-4">
      <h2 className="mb-3">Editar Producto</h2>

      <form onSubmit={handleSubmit} className="editar-producto-form row g-3">
        <div className="col-md-6">
          <label className="form-label">
            ID (No editable):
            <input
              type="text"
              value={formData.id}
              name="id"
              readOnly
              disabled
              className="form-control"
            />
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

        {/* 🔹 NUEVO CAMPO CANTIDAD */}
        <div className="col-md-6">
          <label className="form-label">
            Cantidad:
            <input
              type="number"
              name="cantidad"
              value={formData.cantidad}
              onChange={handleChange}
              className="form-control"
              min={0}
              required
            />
          </label>
        </div>

        <div className="col-12">
          <label className="form-label">
            Imagen (URL):
            <input
              type="text"
              name="imagenUrl"
              value={formData.imagenUrl}
              onChange={handleChange}
              className="form-control"
            />
          </label>

          {formData.imagenUrl && (
            <div className="mt-2">
              <img
                src={formData.imagenUrl}
                alt="Previsualización"
                style={{ height: "100px", objectFit: "contain" }}
                onError={(e) =>
                  ((e.target as HTMLImageElement).style.display = "none")
                }
              />
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
