import React, { useEffect, useState } from "react";
import Header from "../../components/Tienda/Header";
import Footer from "../../components/Tienda/Footer";
import axios from "axios";
import "../../assets/CSS/Tienda/styles.css";
import "../../assets/CSS/Tienda/checkout.css";

interface ProductoCarrito {
  id: string;
  cantidad: number;
}

interface ProductoDetalle {
  id: string;
  nombre: string;
  precio: number;
  imagenUrl: string;
  cantidad: number;
}

const Checkout: React.FC = () => {
  const [carrito, setCarrito] = useState<ProductoDetalle[]>([]);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [resultMessage, setResultMessage] = useState("");

  // ⚠️ Reemplaza con el ID del usuario logueado
  const usuarioId = "123";

  // 🔹 Cargar carrito desde backend
  const fetchCarrito = async () => {
    try {
      const response = await axios.get(`/api/v2/carritos/usuario/${usuarioId}`);

      // 🔹 Extraemos array seguro desde HATEOAS
      const carritoBackend: ProductoCarrito[] =
        response.data._embedded?.carritoDTOList || [];

      // 🔹 Traer detalles de cada producto
      const productosCompletos = await Promise.all(
        carritoBackend.map(async (item) => {
          const prodRes = await axios.get(`/api/v2/productos/${item.id}`);
          return { ...prodRes.data, cantidad: item.cantidad };
        })
      );

      setCarrito(productosCompletos);
    } catch (error) {
      console.error("Error al cargar carrito:", error);
      setCarrito([]);
    }
  };

  useEffect(() => {
    fetchCarrito();
    setDiscountApplied(false); // 🔹 Aquí podrías obtener el descuento del backend si existe
  }, []);

  const total =
    carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0) *
    (discountApplied ? 0.8 : 1);

  // 🔹 Finalizar compra
  const handleFinalize = async () => {
    if (!address || !paymentMethod || (paymentMethod === "tarjeta" && cardNumber.length < 16)) {
      setResultMessage("Compra fallida: revisa dirección o datos de pago ❌");
      return;
    }

    try {
      // 🔹 Generar boleta en el backend
      await axios.post(`/api/v2/boletas/usuario/${usuarioId}`, carrito);

      setResultMessage("¡Compra realizada con éxito! ✅");
      setCarrito([]);
      setAddress("");
      setPaymentMethod("");
      setCardNumber("");
    } catch (error) {
      console.error("Error al generar la boleta:", error);
      setResultMessage("No se pudo completar la compra ❌");
    }
  };

  return (
    <>
      <Header />
      <main className="checkout-container">
        <h1>Finalizar Compra</h1>

        {/* 🛍️ Listado de productos */}
        <div className="checkout-products">
          {carrito.length === 0 ? (
            <p>Tu carrito está vacío 🛒</p>
          ) : (
            <>
              {carrito.map((p) => (
                <div className="checkout-product" key={p.id}>
                  <img
                    src={p.imagenUrl}
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
