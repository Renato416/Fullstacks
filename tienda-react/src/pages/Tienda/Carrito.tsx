import React, { useEffect, useState } from "react";
import Header from "../../components/Tienda/Header";
import Footer from "../../components/Tienda/Footer";
import { useNavigate } from "react-router-dom";

interface ProductoCarrito {
  nombre: string;
  precio: number;
  img: string;
  cantidad: number;
}

const Carrito: React.FC = () => {
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);
  const [discountApplied, setDiscountApplied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const carritoLocal = JSON.parse(localStorage.getItem("carrito") || "[]");
    setCarrito(carritoLocal);
  }, []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const handleQuantityChange = (index: number, value: number) => {
    if (value < 1) value = 1;
    const newCarrito = [...carrito];
    newCarrito[index].cantidad = value;
    setCarrito(newCarrito);
  };

  const handleIncrement = (index: number) => {
    const newCarrito = [...carrito];
    newCarrito[index].cantidad++;
    setCarrito(newCarrito);
  };

  const handleDecrement = (index: number) => {
    const newCarrito = [...carrito];
    if (newCarrito[index].cantidad > 1) newCarrito[index].cantidad--;
    setCarrito(newCarrito);
  };

  const handleRemove = (index: number) => {
    const newCarrito = [...carrito];
    newCarrito.splice(index, 1);
    setCarrito(newCarrito);
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

  const total = carrito.reduce(
    (acc, p) => acc + p.precio * p.cantidad,
    0
  ) * (discountApplied ? 0.8 : 1);

  return (
    <>
      <Header />
      <main>
        <h1>Mi carrito de compras</h1>
        <div className="cart-container">
          <div className="products">
            {carrito.length === 0 ? (
              <p style={{ textAlign: "center", color: "white" }}>
                Tu carrito está vacío 🛒
              </p>
            ) : (
              carrito.map((p, i) => {
                const subtotal = p.precio * p.cantidad;
                return (
                  <div className="product" key={i}>
                    <img src={p.img} alt={p.nombre} className="product-image" />
                    <div className="product-info">
                      <h2>{p.nombre}</h2>
                      <p className="unit-price">
                        Precio: ${p.precio.toLocaleString()}
                      </p>
                    </div>
                    <div className="product-actions">
                      <div className="quantity">
                        <button onClick={() => handleDecrement(i)}>-</button>
                        <input
                          type="number"
                          value={p.cantidad}
                          min={1}
                          onChange={(e) =>
                            handleQuantityChange(i, parseInt(e.target.value))
                          }
                        />
                        <button onClick={() => handleIncrement(i)}>+</button>
                      </div>
                      <p className="subtotal">
                        Subtotal: ${subtotal.toLocaleString()}
                      </p>
                      <button onClick={() => handleRemove(i)}>Eliminar</button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="summary">
            <h2>Total:</h2>
            <p className="total-amount">${total.toLocaleString()}</p>
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
