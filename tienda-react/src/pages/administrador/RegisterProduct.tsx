import React, { useState } from "react";
import "../../assets/css/administrador/registro_producto.css";

interface ProductForm {
  nombre: string;
  sku: string;
  categoria: string;
  precio: number;
  stock: number;
  descripcion: string;
  proveedores: string[];
  ubicacion: string[];
}

const RegisterProduct: React.FC = () => {
  const [formData, setFormData] = useState<ProductForm>({
    nombre: "",
    sku: "",
    categoria: "",
    precio: 0,
    stock: 0,
    descripcion: "",
    proveedores: [],
    ubicacion: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "number") {
      setFormData(prev => ({ ...prev, [name]: Number(value) }));
    } else if (e.target instanceof HTMLSelectElement && e.target.multiple) {
      const values = Array.from(e.target.selectedOptions).map(option => option.value);
      setFormData(prev => ({ ...prev, [name]: values }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nuevoProducto = {
      ...formData,
      fecha: new Date().toISOString().slice(0, 10),
    };

    const productos = JSON.parse(localStorage.getItem("productos") || "[]");
    productos.push(nuevoProducto);
    localStorage.setItem("productos", JSON.stringify(productos));

    alert("Producto agregado con éxito ✅");
    // Redirigir o limpiar el formulario
    setFormData({
      nombre: "",
      sku: "",
      categoria: "",
      precio: 0,
      stock: 0,
      descripcion: "",
      proveedores: [],
      ubicacion: [],
    });
  };

  return (
    <div className="register-product-container">
      <aside className="sidebar">
        <h2>Company</h2>
        <ul>
          <li><a href="#">Dashboard</a></li>
          <li><a href="#" className="active">Productos</a></li>
          <li><a href="#">Inventario</a></li>
          <li><a href="#">Reportes</a></li>
          <li><a href="#">Empleados</a></li>
          <li><a href="#">Clientes</a></li>
        </ul>
      </aside>

      <main className="main-content">
        <div className="header">
          <h1>NUEVO PRODUCTO</h1>
        </div>

        <form className="form-container" onSubmit={handleSubmit}>
          <h3>Registro de producto</h3>

          <label htmlFor="nombre">Nombre del producto</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />

          <label htmlFor="sku">SKU (código)</label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            required
          />

          <label htmlFor="categoria">Categoría</label>
          <input
            type="text"
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
          />

          <label htmlFor="precio">Precio</label>
          <input
            type="number"
            id="precio"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />

          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            required
          />

          <label htmlFor="descripcion">Descripción (opcional)</label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows={3}
            value={formData.descripcion}
            onChange={handleChange}
          />

          <div className="select-row">
            <div>
              <label htmlFor="proveedores">Proveedores</label>
              <select
                id="proveedores"
                name="proveedores"
                multiple
                value={formData.proveedores}
                onChange={handleChange}
              >
                <option>Proveedor A</option>
                <option>Proveedor B</option>
                <option>Proveedor C</option>
                <option>Proveedor D</option>
              </select>
            </div>

            <div>
              <label htmlFor="ubicacion">Ubicación / Almacén</label>
              <select
                id="ubicacion"
                name="ubicacion"
                multiple
                value={formData.ubicacion}
                onChange={handleChange}
              >
                <option>Bodega Central</option>
                <option>Almacén Norte</option>
                <option>Almacén Sur</option>
                <option>Mostrador</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn-submit">AGREGAR PRODUCTO</button>
        </form>
      </main>
    </div>
  );
};

export default RegisterProduct;
