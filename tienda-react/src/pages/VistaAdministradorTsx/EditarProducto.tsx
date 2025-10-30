import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerProductos, actualizarProducto } from "../../assets/data/data";
import type { Producto } from "../../assets/data/data";
import "../../assets/CSS/VistaAdministradorTsxCSS/EditarProducto.css";

const EditarProducto: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [formData, setFormData] = useState<Producto>({
    id: "",
    categoria: "",
    nombre: "",
    precio: 0,
    imagen: "",
  });

  useEffect(() => {
    const productos = obtenerProductos();
    const encontrado = productos.find((p) => p.id === id);
    if (encontrado) {
      setProducto(encontrado);
      setFormData(encontrado);
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "precio" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre.trim()) {
      alert("El nombre del producto no puede estar vacío");
      return;
    }
    actualizarProducto(formData.id, formData);
    alert("Producto actualizado con éxito");
    navigate("/productos");
  };

  if (!producto) {
    return <div className="editar-producto-container">Producto no encontrado</div>;
  }

  return (
    <div className="editar-producto-container container mt-4">
      <h2 className="mb-3">Editar Producto</h2>
      <form onSubmit={handleSubmit} className="editar-producto-form row g-3">
        <div className="col-md-6">
          <label className="form-label">
            ID:
            <input type="text" value={formData.id} name="id" readOnly className="form-control" />
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
            />
          </label>
        </div>

        <div className="col-md-6">
          <label className="form-label">
            Categoría:
            <input
              type="text"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              className="form-control"
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
