import React, { useEffect, useState } from "react";
import Header from "../../components/Tienda/Header";
import Footer from "../../components/Tienda/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/CSS/Tienda/styles.css";
import "../../assets/CSS/Tienda/carrito_com.css";

interface ProductoCarrito {
  id: string; // ID del producto en el carrito
  cantidad: number;
}

interface ProductoDetalle {
  id: string;
  nombre: string;
  precio: number;
  imagenUrl: string;
  cantidad: number; // cantidad en el carrito
}

const Carrito: React.FC = () => {
  const [carrito, setCarrito] = useState<ProductoDetalle[]>([]);
  const [discountApplied, setDiscountApplied] = useState(false);
  const navigate = useNavigate();

  // ⚠️ Reemplaza con el ID del usuario logueado
  const usuarioId = "123";

  // 🔹 Cargar carrito desde backend y normalizar la respuesta
  const fetchCarrito = async () => {
    try {
      const response = await axios.get(`/api/v2/carritos/usuario/${usuarioId}`);
      let carritoBackend: ProductoCarrito[] = [];

      if (response.data._embedded && response.data._embedded.carritoDTOList) {
        carritoBackend = response.data._embedded.carritoDTOList;
      } else if (Array.isArray(response.data)) {
        carritoBackend = response.data;
      } else {
        console.error("Respuesta inesperada del backend:", response.data);
      }

      // Traer detalles de cada producto
      const productosCompletos = await Promise.all(
        carritoBackend.map(async (item) => {
          const prodRes = await axios.get(`/api/v2/productos/${item.id}`);
          return { ...prodRes.data, cantidad: item.cantidad };
        })
      );

      setCarrito(productosCompletos);
    } catch (error) {
      console.error("Error al cargar carrito:", error);
    }
  };

  useEffect(() => {
    fetchCarrito();
  }, []);

  // 🔹 Cambiar cantidad
  const handleQuantityChange = async (productoId: string, cantidad: number) => {
    if (cantidad < 1) cantidad = 1;
    try {
      await axios.put(
        `/api/v2/carritos/usuario/${usuarioId}/producto/${productoId}?cantidad=${cantidad}`
      );
      fetchCarrito();
    } catch (error) {
      console.error("Error al actualizar cantidad:", error);
    }
  };

  const handleIncrement = (productoId: string) => {
    const prod = carrito.find((p) => p.id === productoId);
    if (prod) handleQuantityChange(productoId, prod.cantidad + 1);
  };

  const handleDecrement = (productoId: string) => {
    const prod = carrito.find((p) => p.id === productoId);
    if (prod && prod.cantidad > 1) handleQuantityChange(productoId, prod.cantidad - 1);
  };

  // 🔹 Eliminar producto
  const handleRemove = async (productoId: string) => {
    try {
      await axios.delete(`/api/v2/carritos/usuario/${usuarioId}/producto/${productoId}`);
      fetchCarrito();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  // 🔹 Aplicar cupón
  const handleApplyCoupon = (code: string) => {
    if (code === "Level-up") {
      setDiscountApplied(true);
      alert("Cupón aplicado: 20% de descuento ✅");
    } else {
      setDiscountApplied(false);
      alert("Cupón inválido ❌");
    }
  };

  // 🔹 Comprar
  const handleBuy = async () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío 😅");
      return;
    }
    try {
      await axios.post(`/api/v2/boletas/usuario/${usuarioId}`, carrito);
      alert("Compra realizada ✅");
      navigate("/checkout");
    } catch (error) {
      console.error("Error al generar la boleta:", error);
      alert("No se pudo completar la compra ❌");
    }
  };

  const total =
    carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0) *
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
            {carrito.length === 0 ? (
              <p style={{ textAlign: "center", color: "white" }}>
                Tu carrito está vacío 🛒
              </p>
            ) : (
              carrito.map((p) => {
                const subtotal = p.precio * p.cantidad;
                return (
                  <div className="product" key={p.id}>
                    <img src={p.imagenUrl} alt={p.nombre} className="product-image" />
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
                            handleQuantityChange(p.id, parseInt(e.target.value) || 1)
                          }
                        />
                        <button onClick={() => handleIncrement(p.id)}>+</button>
                      </div>
                      <p>Subtotal: ${subtotal.toLocaleString()}</p>
                      <button className="remove" onClick={() => handleRemove(p.id)}>
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
            <input type="text" placeholder="Ingrese el cupón de descuento" id="coupon" />
            <button
              className="apply"
              onClick={() =>
                handleApplyCoupon((document.getElementById("coupon") as HTMLInputElement).value)
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
