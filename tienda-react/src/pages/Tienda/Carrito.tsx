import React, { useEffect, useState } from "react";
import { Header } from "../../components/Tienda/Header";
import { Footer } from "../../components/Tienda/Footer";
import "../../assets/CSS/Tienda/carrito_com.css";

interface Producto {
  img: string;
  nombre: string;
  precio: number;
  cantidad: number;
}

export const Carrito: React.FC = () => {
  const [carrito, setCarrito] = useState<Producto[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [cupon, setCupon] = useState<string>("");

  // Cargar carrito desde localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("carrito") || "[]");
    setCarrito(saved);
  }, []);

  // Actualizar total al cambiar carrito
  useEffect(() => {
    const totalCalc = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    setTotal(totalCalc);
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const incrementar = (i: number) => {
    const newCart = [...carrito];
    newCart[i].cantidad++;
    setCarrito(newCart);
  };

  const disminuir = (i: number) => {
    const newCart = [...carrito];
    if (newCart[i].cantidad > 1) newCart[i].cantidad--;
    setCarrito(newCart);
  };

  const eliminar = (i: number) => {
    const newCart = carrito.filter((_, index) => index !== i);
    setCarrito(newCart);
  };

  const handleCantidadChange = (i: number, valor: number) => {
    const newCart = [...carrito];
    newCart[i].cantidad = valor < 1 ? 1 : valor;
    setCarrito(newCart);
  };

  const aplicarCupon = () => {
    if (cupon === "DESCUENTO10") {
      setTotal((prev) => prev * 0.9);
      alert("Cupón aplicado: 10% de descuento");
    } else {
      alert("Cupón inválido");
    }
  };

  return (
    <>
      <Header />

      <main>
        <h1>Mi carrito de compras</h1>
        <div className="cart-container">
          {/* Productos */}
          <div className="products">
            {carrito.length === 0 ? (
              <p>Tu carrito está vacío</p>
            ) : (
              carrito.map((p, i) => (
                <div className="product" key={i}>
                  <img src={p.img} alt={p.nombre} className="product-image" />
                  <div className="product-info">
                    <h2>{p.nombre}</h2>
                  </div>
                  <div className="product-price">
                    <span>${p.precio.toLocaleString()}</span>
                    <div className="quantity">
                      <button onClick={() => disminuir(i)}>-</button>
                      <input
                        type="number"
                        value={p.cantidad}
                        min={1}
                        onChange={(e) =>
                          handleCantidadChange(i, parseInt(e.target.value))
                        }
                      />
                      <button onClick={() => incrementar(i)}>+</button>
                      <button onClick={() => eliminar(i)}>Eliminar</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Resumen */}
          <div className="summary">
            <h2>Total:</h2>
            <p className="total-amount">${total.toLocaleString()}</p>
            <input
              type="text"
              placeholder="Ingrese el cupón de descuento"
              value={cupon}
              onChange={(e) => setCupon(e.target.value)}
            />
            <button className="apply" onClick={aplicarCupon}>
              APLICAR
            </button>
            <button
              className="pay"
              onClick={() => alert("Redirigiendo al pago...")}
            >
              PAGAR
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};
