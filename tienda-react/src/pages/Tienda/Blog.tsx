import React, { useEffect } from "react";
import { Header } from "../../components/Tienda/Header";
import "../../assets/CSS/Tienda/blog.css";

export const Blog: React.FC = () => {
  // 🔁 Actualiza el contador del carrito
  const actualizarContadorCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    const totalItems = carrito.reduce(
      (acc: number, producto: { cantidad: number }) => acc + producto.cantidad,
      0
    );
    const contador = document.querySelector(".carrito-text");
    if (contador) {
      contador.textContent = `Productos (${totalItems})`;
    }
  };

  useEffect(() => {
    actualizarContadorCarrito();
  }, []);

  return (
    <>
      <Header />

      <main className="blog-container">
        <h2>ACTUALIZACIONES DEL CATÁLOGO Y SISTEMA</h2>

        {/* Tarjeta 1 */}
        <div className="card">
          <div className="card-text">
            <h3>ACTUALIZACIÓN CATÁLOGO</h3>
            <p>
              Catálogo actualizado para la expansión de variedad y gustos
              diversificados del usuario.
            </p>
            <button>DETALLES ▼</button>
          </div>
        </div>

        {/* Tarjeta 2 */}
        <div className="card">
          <div className="card-text">
            <h3>ACTUALIZACIÓN SISTEMA</h3>
            <p>
              Sistema arreglado y preparado para el uso del usuario con mejoras
              de rendimiento y estabilidad.
            </p>
            <button>DETALLES ▼</button>
          </div>
        </div>
      </main>
    </>
  );
};
