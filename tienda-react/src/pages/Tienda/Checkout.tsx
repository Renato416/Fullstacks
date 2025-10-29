import React, { useEffect, useState } from "react";
import Header from "../../components/Tienda/Header";
import Footer from "../../components/Tienda/Footer";
import { productos } from "../../assets/data/data";
import type { Producto } from "../../assets/data/data";
import "../../assets/CSS/Tienda/styles.css";
import "../../assets/CSS/Tienda/checkout.css";

interface ProductoCarrito {
  id: string;
  cantidad: number;
}

const Checkout: React.FC = () => {
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);
  const [productosEnCarrito, setProductosEnCarrito] = useState<(Producto & { cantidad: number })[]>([]);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [resultMessage, setResultMessage] = useState("");

  // 🔹 Cargar carrito y descuento desde localStorage
  useEffect(() => {
    const carritoLocal = JSON.parse(localStorage.getItem("carrito") || "[]");
    setCarrito(carritoLocal);
    const descuento = localStorage.getItem("descuento") === "true";
    setDiscountApplied(descuento);
  }, []);

  // 🔹 Actualizar productos con la información real desde la base de datos
  useEffect(() => {
    const detalles = carrito
      .map((item) => {
        const productoInfo = productos.find((p) => p.id === item.id);
        return productoInfo ? { ...productoInfo, cantidad: item.cantidad } : null;
      })
      .filter(Boolean) as (Producto & { cantidad: number })[];

    setProductosEnCarrito(detalles);
  }, [carrito]);

  // 🔹 Calcular total con descuento si aplica
  const total =
    productosEnCarrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0) *
    (discountApplied ? 0.8 : 1);

  // 🔹 Finalizar compra
  const handleFinalize = () => {
    if (!address || !paymentMethod || (paymentMethod === "tarjeta" && cardNumber.length < 16)) {
      setResultMessage("Compra fallida: revisa dirección o datos de pago ❌");
      return;
    }

    // 🔸 Aquí podrías guardar una orden en la base de datos (simulado)
    const nuevaOrden = {
      id: "ORD-" + Math.floor(Math.random() * 10000),
      usuario: "Cliente Anónimo",
      fecha: new Date().toISOString().split("T")[0],
      total: total,
      estado: "Completada",
    };
    console.log("✅ Orden registrada:", nuevaOrden);

    // 🔸 Limpiar carrito y localStorage
    setResultMessage("¡Compra realizada con éxito! ✅");
    localStorage.removeItem("carrito");
    localStorage.removeItem("descuento");
    actualizarContadorCarrito();
    setCarrito([]);
    setProductosEnCarrito([]);
  };

  // 🔹 Actualizar contador del carrito en el header
  const actualizarContadorCarrito = () => {
    const carritoHeader = JSON.parse(localStorage.getItem("carrito") || "[]");
    const totalItems = carritoHeader.reduce((acc: number, p: ProductoCarrito) => acc + p.cantidad, 0);
    const contador = document.querySelector(".carrito-text");
    if (contador) contador.textContent = `Productos (${totalItems})`;
  };

  return (
    <>
      <Header />
      <main className="checkout-container">
        <h1>Finalizar Compra</h1>

        {/* 🛍️ Listado de productos */}
        <div className="checkout-products">
          {productosEnCarrito.length === 0 ? (
            <p>Tu carrito está vacío 🛒</p>
          ) : (
            <>
              {productosEnCarrito.map((p) => (
                <div className="checkout-product" key={p.id}>
                  <img
                    src={`/assets/IMG/${p.imagen}`}
                    alt={p.nombre}
                    style={{ width: "80px", borderRadius: "8px" }}
                  />
                  <span>
                    {p.nombre} x {p.cantidad} —{" "}
                    <strong>${(p.precio * p.cantidad).toLocaleString()}</strong>
                  </span>
                </div>
              ))}
              <div>
                <strong>Total a pagar: ${total.toLocaleString()}</strong>
                {discountApplied && <p>(Incluye 20% de descuento aplicado)</p>}
              </div>
            </>
          )}
        </div>

        {/* 💳 Formulario de pago */}
        <div className="checkout-form">
          <label>Dirección:</label>
          <input
            type="text"
            placeholder="Ingrese su dirección"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <label>Método de pago:</label>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="">Seleccione</option>
            <option value="tarjeta">Tarjeta de crédito</option>
            <option value="paypal">PayPal</option>
            <option value="transferencia">Transferencia bancaria</option>
          </select>

          {paymentMethod === "tarjeta" && (
            <input
              type="text"
              placeholder="Número de tarjeta"
              maxLength={16}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          )}

          <button id="finalize" onClick={handleFinalize}>
            Finalizar Compra
          </button>
        </div>

        {/* 📩 Resultado */}
        {resultMessage && (
          <div className="checkout-result">
            <p>{resultMessage}</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Checkout;
