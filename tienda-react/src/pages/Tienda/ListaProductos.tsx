import React, { useEffect, useState } from "react";
import Header from "../../components/Tienda/Header";
import Footer from "../../components/Tienda/Footer";
import ProductCard from "../../components/Tienda/ProductoCard";
import { ProductoService } from "../../services/ProductoService";
import type { Producto } from "../../assets/data/data";

import "../../assets/CSS/Tienda/styles.css";
import "../../assets/CSS/Tienda/listaProducto.css";

interface Usuario {
  id: string;
  nombre: string;
  rol: "admin" | "cliente";
}

interface ProductoCarrito {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen?: string;
}

const ListaProductos: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [usuarioActivo, setUsuarioActivo] = useState<Usuario | null>(null);

  /* 🔐 Usuario activo */
  useEffect(() => {
    const usuario = localStorage.getItem("usuarioActivo");
    if (usuario) setUsuarioActivo(JSON.parse(usuario));
  }, []);

  /* 📦 Cargar productos */
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const data = await ProductoService.getAll();
        setProductos(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los productos.");
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  /* 🛒 AGREGAR AL CARRITO (LOCAL + IMAGEN) */
  const handleAddToCart = (producto: Producto) => {
    if (!usuarioActivo || usuarioActivo.rol !== "cliente") {
      alert("Debes iniciar sesión como cliente para agregar productos al carrito");
      return;
    }

    const carritoGuardado = localStorage.getItem("carrito");
    let carrito: ProductoCarrito[] = carritoGuardado
      ? JSON.parse(carritoGuardado)
      : [];

    const existente = carrito.find(
      (p) => p.id === producto.id.toString()
    );

    if (existente) {
      existente.cantidad += 1;
    } else {
      carrito.push({
        id: producto.id.toString(),
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1,
        imagen: producto.imagenUrl, // ✅ IMAGEN GUARDADA
      });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    window.dispatchEvent(new Event("carrito-actualizado"));
    alert("Producto agregado al carrito 🛒");
  };

  /* 🔎 Filtro */
  const filteredProductos = productos.filter((p) =>
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <main>
        <section className="titulo-ofertas">
          <h2>¡NUESTROS PRODUCTOS!</h2>
        </section>

        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading && <p>Cargando catálogo...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <section className="productos-container">
          {filteredProductos.map((p) => (
            <div key={p.id} className="producto-wrapper">
              <ProductCard
                img={p.imagenUrl}
                title={p.nombre}
                price={`$${p.precio.toLocaleString()}`}
              />
              <button
                className="btn-agregar-carrito"
                onClick={() => handleAddToCart(p)}
              >
                Agregar al carrito
              </button>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ListaProductos;
