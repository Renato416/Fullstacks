import React, { useEffect, useState } from "react";
import Header from "../../components/Tienda/Header";
import Footer from "../../components/Tienda/Footer";
import { productos } from "../../assets/data/data";
import type { Producto } from "../../assets/data/data";
import axios from "axios";
import "../../assets/CSS/Tienda/styles.css";
import "../../assets/CSS/Tienda/checkout.css";

interface ProductoCarrito {
  id: string;
  cantidad: number;
}

interface Usuario {
  id: string;
  nombre: string;
  rol: string;
}

const Checkout: React.FC = () => {
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);
  const [productosEnCarrito, setProductosEnCarrito] = useState<
    (Producto & { cantidad: number })[]
  >([]);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [usuarioActivo, setUsuarioActivo] = useState<Usuario | null>(null);

  // =============================
  // Cargar usuario, carrito y descuento
  // =============================
  useEffect(() => {
    const usuario = localStorage.getItem("usuarioActivo");
    if (usuario) setUsuarioActivo(JSON.parse(usuario));

    const carritoLocal = JSON.parse(localStorage.getItem("carrito") || "[]");
    setCarrito(carritoLocal);

    const descuento = localStorage.getItem("descuento") === "true";
    setDiscountApplied(descuento);
  }, []);

  // =============================
  // Mapear productos reales con cantidad
  // =============================
  useEffect(() => {
    const detalles = carrito
      .map((item) => {
        const productoInfo = productos.find(
          (p) => p.id.toString() === item.id
        );
        return productoInfo
          ? { ...productoInfo, cantidad: item.cantidad }
          : null;
      })
      .filter(Boolean) as (Producto & { cantidad: number })[];

    setProductosEnCarrito(detalles);
  }, [carrito]);

  // =============================
  // Calcular total con descuento
  // =============================
  const total =
    productosEnCarrito.reduce(
      (acc, p) => acc + p.precio * p.cantidad,
      0
    ) * (discountApplied ? 0.8 : 1);

  // =============================
  // Finalizar compra
  // =============================
  const handleFinalize = async () => {
    if (!usuarioActivo) {
      setResultMessage("Debes iniciar sesión ❌");
      return;
    }

    if (!address || !paymentMethod) {
      setResultMessage("Completa dirección y método de pago ❌");
      return;
    }

    if (paymentMethod === "tarjeta" && cardNumber.length < 16) {
      setResultMessage("Número de tarjeta inválido ❌");
      return;
    }

    // Preparar detalles de boleta
    const detalles = productosEnCarrito.map((p) => ({
      producto: { id: p.id },
      cantidad: p.cantidad,
      precioUnitario: p.precio,
    }));

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setResultMessage("No estás autenticado ❌");
        return;
      }

      const res = await axios.post(
        `http://localhost:8080/api/v2/boletas/usuario/${usuarioActivo.id}`,
        detalles,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Boleta creada:", res.data);

      // Limpiar carrito
      localStorage.removeItem("carrito");
      localStorage.removeItem("descuento");
      window.dispatchEvent(new Event("carrito-actualizado"));

      setCarrito([]);
      setProductosEnCarrito([]);
      setResultMessage("¡Compra realizada con éxito! ✅");
    } catch (error: any) {
      console.error("Error al crear boleta:", error);
      setResultMessage(
        error.response?.data?.message || "Error al crear la boleta ❌"
      );
    }
  };

  return (
    <>
      <Header />

      <main className="checkout-container">
        <h1>Finalizar Compra</h1>

        {/* 🛍️ Productos en carrito */}
        <div className="checkout-products">
          {productosEnCarrito.length === 0 ? (
            <p>Tu carrito está vacío 🛒</p>
          ) : (
            <>
              {productosEnCarrito.map((p) => (
                <div className="checkout-product" key={p.id}>
                  <img
                    src={p.imagenUrl}
                    alt={p.nombre}
                    className="checkout-image"
                  />
                  <span>
                    {p.nombre} x {p.cantidad} —{" "}
                    <strong>${(p.precio * p.cantidad).toLocaleString()}</strong>
                  </span>
                </div>
              ))}

              <div className="checkout-total">
                <strong>Total: ${total.toLocaleString()} CLP</strong>
                {discountApplied && (
                  <p>(Incluye 20% de descuento aplicado)</p>
                )}
              </div>
            </>
          )}
        </div>

        {/* 💳 Formulario de pago */}
        <div className="checkout-form">
          <label>Dirección</label>
          <input
            type="text"
            placeholder="Ingrese su dirección"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <label>Método de pago</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Seleccione</option>
            <option value="tarjeta">Tarjeta de crédito</option>
            <option value="paypal">PayPal</option>
            <option value="transferencia">Transferencia</option>
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
