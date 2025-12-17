import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Tienda/Header";
import Footer from "../../components/Tienda/Footer";
import "../../assets/CSS/Tienda/styles.css";
import "../../assets/CSS/Tienda/carrito_com.css";

interface ProductoCarrito {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen?: string;
}

const STORAGE_KEY = "carrito";

const Carrito: React.FC = () => {
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);
  const [discountApplied, setDiscountApplied] = useState(false);
  const navigate = useNavigate();

  /* =============================
     CARGAR CARRITO DESDE LOCAL
  ============================== */
  useEffect(() => {
    const carritoGuardado = localStorage.getItem(STORAGE_KEY);
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }

    const syncCarrito = () => {
      const actualizado = localStorage.getItem(STORAGE_KEY);
      setCarrito(actualizado ? JSON.parse(actualizado) : []);
    };

    window.addEventListener("carrito-actualizado", syncCarrito);
    return () =>
      window.removeEventListener("carrito-actualizado", syncCarrito);
  }, []);

  /* =============================
     GUARDAR CARRITO
  ============================== */
  const guardarCarrito = (nuevoCarrito: ProductoCarrito[]) => {
    setCarrito(nuevoCarrito);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevoCarrito));
    window.dispatchEvent(new Event("carrito-actualizado"));
  };

  /* =============================
     CANTIDAD
  ============================== */
  const handleIncrement = (id: string) => {
    guardarCarrito(
      carrito.map((p) =>
        p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
      )
    );
  };

  const handleDecrement = (id: string) => {
    guardarCarrito(
      carrito.map((p) =>
        p.id === id && p.cantidad > 1
          ? { ...p, cantidad: p.cantidad - 1 }
          : p
      )
    );
  };

  const handleQuantityChange = (id: string, value: number) => {
    if (value < 1) value = 1;
    guardarCarrito(
      carrito.map((p) =>
        p.id === id ? { ...p, cantidad: value } : p
      )
    );
  };

  /* =============================
     ELIMINAR
  ============================== */
  const handleRemove = (id: string) => {
    guardarCarrito(carrito.filter((p) => p.id !== id));
  };

  /* =============================
     CUPÓN
  ============================== */
  const handleApplyCoupon = (code: string) => {
    if (code === "Level-up") {
      setDiscountApplied(true);
      alert("Cupón aplicado: 20% de descuento ✅");
    } else {
      setDiscountApplied(false);
      alert("Cupón inválido ❌");
    }
  };

  /* =============================
     TOTAL
  ============================== */
  const subtotal = carrito.reduce(
    (acc, p) => acc + p.precio * p.cantidad,
    0
  );

  const total = discountApplied ? subtotal * 0.8 : subtotal;

  /* =============================
     COMPRAR
  ============================== */
  const handleBuy = () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío 🛒");
      return;
    }
    localStorage.setItem("descuento", JSON.stringify(discountApplied));
    navigate("/checkout");
  };

  return (
    <>
      <Header />

      <main>
        <h1 style={{ color: "var(--primary-color)", marginBottom: "1rem" }}>
          Mi carrito de compras
        </h1>

        <div className="cart-container">
          <div className="products">
            {carrito.length === 0 ? (
              <p style={{ textAlign: "center" }}>
                Tu carrito está vacío 🛒
              </p>
            ) : (
              carrito.map((p) => (
                <div className="product" key={p.id}>
                  <img
                    src={
                      p.imagen ||
                      "https://via.placeholder.com/100?text=Producto"
                    }
                    alt={p.nombre}
                    className="product-image"
                  />

                  <div className="product-info">
                    <h2>{p.nombre}</h2>
                    <p>Precio: ${p.precio.toLocaleString()}</p>
                  </div>

                  <div className="product-price">
                    <div className="quantity">
                      <button onClick={() => handleDecrement(p.id)}>
                        -
                      </button>
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
                      <button onClick={() => handleIncrement(p.id)}>
                        +
                      </button>
                    </div>

                    <p>
                      Subtotal: $
                      {(p.precio * p.cantidad).toLocaleString()}
                    </p>

                    <button
                      className="remove"
                      onClick={() => handleRemove(p.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="summary">
            <h2>Resumen</h2>
            <p className="total-amount">
              Total: ${total.toLocaleString()} CLP
            </p>

            <input
              type="text"
              placeholder="Ingrese cupón"
              id="coupon"
            />
            <button
              className="apply"
              onClick={() =>
                handleApplyCoupon(
                  (document.getElementById("coupon") as HTMLInputElement)
                    .value
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
