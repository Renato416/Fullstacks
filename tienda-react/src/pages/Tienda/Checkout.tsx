import React, { useEffect, useState } from "react";
import Header from "../../components/Tienda/Header";
import Footer from "../../components/Tienda/Footer";
import axios from "axios";
import "../../assets/CSS/Tienda/checkout.css";

interface ProductoDetalle {
  id: string;
  nombre: string;
  precio: number;
  imagenUrl: string;
  cantidad: number;
}

interface Usuario {
  id: string;
  nombre: string;
}

const Checkout: React.FC<{ usuario?: Usuario }> = ({ usuario }) => {
  const [carrito, setCarrito] = useState<ProductoDetalle[]>([]);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [resultMessage, setResultMessage] = useState("");

  const fetchCarrito = async () => {
    if (!usuario) return;
    const res = await axios.get(`/api/v2/carritos/usuario/${usuario.id}`);
    const backendItems = res.data._embedded?.carritoDTOList || [];
    const productosConDetalle = await Promise.all(
      backendItems.map(async (item: { id: string; cantidad: number }) => {
        const prodRes = await axios.get(`/api/v2/productos/${item.id}`);
        return { ...prodRes.data, cantidad: item.cantidad };
      })
    );
    setCarrito(productosConDetalle);
  };

  useEffect(() => {
    fetchCarrito();
  }, [usuario]);

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  const handleFinalize = async () => {
    if (!usuario) return alert("Debes iniciar sesión para comprar");
    if (!address || !paymentMethod) return alert("Completa dirección y método de pago");

    try {
      await axios.post(`/api/v2/boletas/usuario/${usuario.id}`, carrito);
      setResultMessage("¡Compra realizada con éxito!");
      setCarrito([]);
    } catch (err) {
      console.error(err);
      setResultMessage("No se pudo completar la compra ❌");
    }
  };

  return (
    <>
      <Header />
      <main className="checkout-container">
        <h1>Finalizar Compra</h1>

        {carrito.length === 0 ? (
          <p>Tu carrito está vacío 🛒</p>
        ) : (
          <>
            {carrito.map((p) => (
              <div key={p.id}>
                <img src={p.imagenUrl} alt={p.nombre} width={80} />
                <span>{p.nombre} x {p.cantidad} — ${p.precio * p.cantidad}</span>
              </div>
            ))}
            <h2>Total: ${total}</h2>
          </>
        )}

        <div>
          <label>Dirección</label>
          <input value={address} onChange={(e) => setAddress(e.target.value)} />
          <label>Método de pago</label>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="">Seleccione</option>
            <option value="tarjeta">Tarjeta</option>
            <option value="paypal">PayPal</option>
          </select>
          {paymentMethod === "tarjeta" && (
            <input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="Número tarjeta" />
          )}
          <button onClick={handleFinalize}>Finalizar Compra</button>
        </div>

        {resultMessage && <p>{resultMessage}</p>}
      </main>
      <Footer />
    </>
  );
};

export default Checkout;
