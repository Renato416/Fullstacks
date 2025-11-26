import React, { useEffect, useState } from "react";
import Header from "../../components/Tienda/Header";
import Footer from "../../components/Tienda/Footer";
import ProductCard from "../../components/Tienda/ProductoCard";
import { ProductoService } from "../../services/ProductoService";
import type { Producto } from "../../assets/data/data";
import axios from "axios";

import "../../assets/CSS/Tienda/styles.css";
import "../../assets/CSS/Tienda/listaProducto.css";

interface Usuario {
  id: string;
  nombre: string;
  rol: "admin" | "cliente";
}

const ListaProductos: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [usuarioActivo, setUsuarioActivo] = useState<Usuario | null>(null);

  useEffect(() => {
    const usuario = localStorage.getItem("usuarioActivo");
    if (usuario) setUsuarioActivo(JSON.parse(usuario));
  }, []);

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

  const handleAddToCart = async (productoId: number) => {
    if (!usuarioActivo || usuarioActivo.rol !== "cliente") {
      alert("Debes iniciar sesión como cliente para agregar productos al carrito");
      return;
    }

    try {
      await axios.post(
        `/api/v2/carritos/usuario/${usuarioActivo.id}/producto/${productoId}`,
        null,
        { params: { cantidad: 1 } }
      );
      alert("Producto agregado al carrito ✅");
      window.dispatchEvent(new Event("carrito-actualizado"));
    } catch (err) {
      console.error(err);
      alert("No se pudo agregar el producto al carrito");
    }
  };

  const filteredProductos = Array.isArray(productos)
    ? productos.filter((p) =>
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

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
                onClick={() => handleAddToCart(p.id)}
              >
                Agregar al carrito
              </button>
            </div>
          ))}
          {!loading && filteredProductos.length === 0 && <p>No se encontraron productos.</p>}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ListaProductos;
