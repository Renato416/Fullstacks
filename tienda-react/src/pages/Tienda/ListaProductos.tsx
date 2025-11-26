import React, { useState, useEffect } from "react";
import Header from "../../components/Tienda/Header";
import Footer from "../../components/Tienda/Footer";
// 1. Eliminamos la importación de datos falsos 'productos'
// Mantenemos solo el tipo para que TypeScript no se queje
import type { Producto } from "../../assets/data/data";
import { ProductoService } from "../../services/ProductoService"; // 2. Importamos el servicio
import "../../assets/CSS/Tienda/styles.css";
import "../../assets/CSS/Tienda/listaProducto.css";

interface ProductoCarrito {
  id: string;
  cantidad: number;
}

const ListaProducto: React.FC = () => {
  // 3. Estados para manejar los datos del Backend
  const [productosBackend, setProductosBackend] = useState<Producto[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Producto[]>([]);

  // Estados de control visual
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  // 4. useEffect: Carga los productos reales al iniciar la página
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const data = await ProductoService.getAll();

      const dataMapeada = data.map((p: any) => ({
        ...p,
        id: String(p.id), // Aseguramos que el ID sea string para compatibilidad
        imagen: p.imagenUrl || p.imagen, // Usa la URL del backend
      }));

      setProductosBackend(dataMapeada);
      setFilteredProducts(dataMapeada); // Al inicio mostramos todo
    } catch (err) {
      console.error("Error cargando productos:", err);
      setError("Hubo un problema cargando el catálogo. Intenta recargar.");
    } finally {
      setLoading(false);
    }
  };

  // 5. useEffect: Filtrado de búsqueda (Ahora filtra sobre los datos del Backend)
  useEffect(() => {
    const filtered = productosBackend.filter((p) =>
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, productosBackend]);

  // 🔹 Estado local del carrito (Mantengo tu lógica local por ahora)
  const [_carrito, setCarrito] = useState<ProductoCarrito[]>(() => {
    return JSON.parse(localStorage.getItem("carrito") || "[]");
  });

  // 🔹 Agregar producto al carrito
  const handleAddToCart = (id: string) => {
    let carritoActual = JSON.parse(localStorage.getItem("carrito") || "[]");
    const productoExistente = carritoActual.find(
      (item: ProductoCarrito) => item.id === id
    );

    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      carritoActual.push({ id, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carritoActual));
    setCarrito(carritoActual);

    alert("Producto agregado al carrito 🛒 (Localmente)");
    window.dispatchEvent(new Event("carrito-actualizado"));
  };

  return (
    <>
      <Header />

      <main>
        <h2>PRODUCTOS</h2>

        <div className="search-container">
          <input
            id="searchInput"
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* 6. Mensajes de Carga y Error */}
        {loading && (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            Cargando catálogo...
          </p>
        )}
        {error && (
          <p style={{ textAlign: "center", color: "red", marginTop: "20px" }}>
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="productos-grid">
            {filteredProducts.map((product) => (
              <div className="producto" key={product.id}>
                {/* 7. Manejo de imagen con respaldo por si falla la URL */}
                <img
                  src={product.imagen}
                  alt={product.nombre}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/200?text=Sin+Imagen";
                  }}
                />
                <h3 className="titulo">{product.nombre}</h3>
                <p className="precio">${product.precio.toLocaleString()}</p>
                <button onClick={() => handleAddToCart(product.id)}>
                  Agregar al carrito
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default ListaProducto;
