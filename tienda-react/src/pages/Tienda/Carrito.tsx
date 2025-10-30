import React, { useEffect, useState } from "react";
import Header from "../../components/Tienda/Header";
import Footer from "../../components/Tienda/Footer";
import { useNavigate } from "react-router-dom";
import { productos } from "../../assets/data/data";
import type { Producto } from "../../assets/data/data";
import "../../assets/CSS/Tienda/styles.css";
import "../../assets/CSS/Tienda/carrito_com.css";

interface ProductoCarrito {
  id: string;
  cantidad: number;
}

const Carrito: React.FC = () => {
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [update, setUpdate] = useState(0); // 🔹 Fuerza re-render
  const navigate = useNavigate();

  // 🔹 Cargar carrito al montar
  useEffect(() => {
    const carritoLocal = JSON.parse(localStorage.getItem("carrito") || "[]");
    setCarrito(carritoLocal);

    // 🔹 Escuchar cambios en localStorage (para cuando se agregue desde otra pestaña o ListaProducto)
    const handleStorageChange = () => setUpdate((u) => u + 1);
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // 🔹 Cada vez que `update` cambia, recargamos carrito desde localStorage
  useEffect(() => {
    const carritoLocal = JSON.parse(localStorage.getItem("carrito") || "[]");
    setCarrito(carritoLocal);
  }, [update]);

  // 🔹 Obtener productos completos del carrito
  const productosEnCarrito = carrito
    .map((item) => {
      const productoInfo = productos.find((p) => p.id === item.id);
      return productoInfo ? { ...productoInfo, cantidad: item.cantidad } : null;
    })
    .filter(Boolean) as (Producto & { cantidad: number })[];

  const handleQuantityChange = (id: string, value: number) => {
    if (value < 1) value = 1;
    const nuevoCarrito = carrito.map((item) =>
      item.id === id ? { ...item, cantidad: value } : item
    );
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const handleIncrement = (id: string) => {
    const nuevoCarrito = carrito.map((item) =>
      item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
    );
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const handleDecrement = (id: string) => {
    const nuevoCarrito = carrito.map((item) =>
      item.id === id && item.cantidad > 1
        ? { ...item, cantidad: item.cantidad - 1 }
        : item
    );
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const handleRemove = (id: string) => {
    const nuevoCarrito = carrito.filter((item) => item.id !== id);
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const handleApplyCoupon = (code: string) => {
    if (code === "Level-up") {
      setDiscountApplied(true);
      alert("Cupón aplicado: 20% de descuento ✅");
    } else {
      setDiscountApplied(false);
      alert("Cupón inválido ❌");
    }
  };

  const handleBuy = () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío 😅");
      return;
    }
    localStorage.setItem("descuento", JSON.stringify(discountApplied));
    navigate("/checkout");
  };

  const total =
    productosEnCarrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0) *
    (discountApplied ? 0.8 : 1);

  return (
    <>
      <Header />
      <main>
        <h1 style={{ color: "var(--primary-color)", marginBottom: "1rem" }}>
          Mi carrito de compras
        </h1>

        <div className="cart-container">
          <div className="products">
            {productosEnCarrito.length === 0 ? (
              <p style={{ textAlign: "center", color: "white" }}>
                Tu carrito está vacío 🛒
              </p>
            ) : (
              productosEnCarrito.map((p) => {
                const subtotal = p.precio * p.cantidad;
                return (
                  <div className="product" key={p.id}>
                    <img
                      src={p.imagen}
                      alt={p.nombre}
                      className="product-image"
                    />
                    <div className="product-info">
                      <h2>{p.nombre}</h2>
                      <p>Precio: ${p.precio.toLocaleString()}</p>
                    </div>
                    <div className="product-price">
                      <div className="quantity">
                        <button onClick={() => handleDecrement(p.id)}>-</button>
                        <input
                          type="number"
                          value={p.cantidad}
                          min={1}
                          onChange={(e) =>
                            handleQuantityChange(
                              p.id,
                              parseInt(e.target.value) || 1
                            )
                          }
                        />
                        <button onClick={() => handleIncrement(p.id)}>+</button>
                      </div>
                      <p>Subtotal: ${subtotal.toLocaleString()}</p>
                      <button
                        className="remove"
                        onClick={() => handleRemove(p.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="summary">
            <h2>Resumen</h2>
            <p className="total-amount">Total: ${total.toLocaleString()}</p>
            <input
              type="text"
              placeholder="Ingrese el cupón de descuento"
              id="coupon"
            />
            <button
              className="apply"
              onClick={() =>
                handleApplyCoupon(
                  (document.getElementById("coupon") as HTMLInputElement).value
                )
              }
            >
              APLICAR
            </button>
            <button className="buy" onClick={handleBuy}>
              COMPRAR
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Carrito;
