import React, { useEffect, useState } from "react";
import Header from "../../components/Tienda/Header";
import Footer from "../../components/Tienda/Footer";

interface ProductoCarrito {
  nombre: string;
  precio: number;
  img: string;
  cantidad: number;
}

const Checkout: React.FC = () => {
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [resultMessage, setResultMessage] = useState("");

  useEffect(() => {
    const carritoLocal = JSON.parse(localStorage.getItem("carrito") || "[]");
    setCarrito(carritoLocal);
    const descuento = localStorage.getItem("descuento") === "true";
    setDiscountApplied(descuento);
  }, []);

  const total = carrito.reduce(
    (acc, p) => acc + p.precio * p.cantidad,
    0
  ) * (discountApplied ? 0.8 : 1);

  const handleFinalize = () => {
    if (!address || !paymentMethod || (paymentMethod === "tarjeta" && cardNumber.length < 16)) {
      setResultMessage("Compra fallida: revisa dirección o datos de pago ❌");
      return;
    }

    setResultMessage("¡Compra realizada con éxito! ✅");
    localStorage.removeItem("carrito");
    actualizarContadorCarrito();
    setCarrito([]);
  };

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

        <div className="checkout-products">
          {carrito.length === 0 ? (
            <p>Tu carrito está vacío 🛒</p>
          ) : (
            <>
              {carrito.map((p, i) => (
                <div className="checkout-product" key={i}>
                  <span>
                    {p.nombre} x {p.cantidad} - ${ (p.precio * p.cantidad).toLocaleString() }
                  </span>
                </div>
              ))}
              <div>
                <strong>Total a pagar: ${total.toLocaleString()}</strong>
              </div>
            </>
          )}
        </div>

        <div className="checkout-form">
          <label>Dirección:</label>
          <input
            type="text"
            placeholder="Ingrese su dirección"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <label>Método de pago:</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Seleccione</option>
            <option value="tarjeta">Tarjeta de crédito</option>
            <option value="paypal">PayPal</option>
            <option value="transferencia">Transferencia bancaria</option>
          </select>

          {paymentMethod === "tarjeta" && (
            <input
              type="text"
              placeholder="Número de tarjeta"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          )}

          <button id="finalize" onClick={handleFinalize}>
            Finalizar Compra
          </button>
        </div>

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
