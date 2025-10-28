import React, { useState } from "react";
import { Header } from "../../components/Tienda/Header";
import "../../assets/CSS/d_producto.css";
import carritoIcon from "../../assets/IMG/carrito-icon.png";
import logo from "../../assets/IMG/icon-level-up.png";
import "../../assets/CSS/Tienda/listaProducto.css";

export const ProductoDetalle: React.FC = () => {
  // Estado para manejar cantidad seleccionada
  const [cantidad, setCantidad] = useState<number>(1);

  // Ejemplo de datos del producto (en un caso real, se recibiría por props o desde una API)
  const producto = {
    nombre: "Nombre Producto",
    precio: 100,
    descripcion:
      "Las manzanas son una fruta deliciosa y versátil, apreciada en todo el mundo por su sabor refrescante y sus numerosos beneficios para la salud. Disponibles en una variedad de colores, desde el rojo vibrante hasta el verde brillante y el amarillo dorado, las manzanas son una opción perfecta para cualquier ocasión.",
    imagenPrincipal: logo, // Usa una imagen real de tu carpeta /IMG si quieres
    miniaturas: [logo, carritoIcon, logo],
  };

  const handleAddToCart = () => {
    const nuevoProducto = {
      nombre: producto.nombre,
      precio: producto.precio,
      img: producto.imagenPrincipal,
      cantidad: cantidad,
    };

    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    const index = carrito.findIndex((p: any) => p.nombre === nuevoProducto.nombre);

    if (index >= 0) {
      carrito[index].cantidad += cantidad;
    } else {
      carrito.push(nuevoProducto);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`${producto.nombre} agregado al carrito ✅`);
  };

  return (
    <>
      <Header />

      <div className="breadcrumb">
        <a href="#">Home</a> &gt; <a href="#">Category</a> &gt;{" "}
        <span>{producto.nombre}</span>
      </div>

      <main className="product-page">
        <div className="product-images">
          <div className="main-image">
            <img src={producto.imagenPrincipal} alt={producto.nombre} />
          </div>
          <div className="thumbnails">
            {producto.miniaturas.map((thumb, i) => (
              <div key={i} className={`thumb ${i === 0 ? "active" : ""}`}>
                <img src={thumb} alt={`miniatura ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="product-details">
          <h1>{producto.nombre}</h1>
          <p className="price">${producto.precio.toLocaleString()}</p>
          <p className="description">{producto.descripcion}</p>

          <label htmlFor="quantity">Cantidad</label>
          <select
            id="quantity"
            value={cantidad}
            onChange={(e) => setCantidad(parseInt(e.target.value))}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>

          <button className="add-cart" onClick={handleAddToCart}>
            Añadir al carrito
          </button>
        </div>
      </main>

      <section className="related-products">
        <h2>Productos Relacionados</h2>
        <div className="related-list">
          <div className="related-item"></div>
          <div className="related-item"></div>
          <div className="related-item"></div>
          <div className="related-item"></div>
        </div>
      </section>
    </>
  );
};
