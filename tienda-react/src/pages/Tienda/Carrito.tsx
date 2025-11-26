import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Tienda/Header";
import Footer from "../../components/Tienda/Footer";
import "../../assets/CSS/Tienda/carrito_com.css";

interface ProductoCarrito {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
}

interface Usuario {
  id: string;
  nombre: string;
  rol: "admin" | "cliente";
}

const Carrito: React.FC = () => {
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);
  const [usuarioActivo, setUsuarioActivo] = useState<Usuario | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = localStorage.getItem("usuarioActivo");
    if (usuario) setUsuarioActivo(JSON.parse(usuario));
  }, []);

  const fetchCarrito = async () => {
    if (!usuarioActivo) return;

    try {
      const res = await axios.get(`/api/v2/carritos/usuario/${usuarioActivo.id}`);
      const detalles = res.data.detalles || [];

      const productosConDetalle: ProductoCarrito[] = detalles.map((d: any) => ({
        id: d.productoId.toString(),
        nombre: d.nombreProducto,
        precio: d.precioProducto,
        cantidad: d.cantidad,
      }));

      setCarrito(productosConDetalle);
    } catch (err) {
      console.error(err);
      setCarrito([]);
    }
  };

  useEffect(() => {
    fetchCarrito();
    window.addEventListener("carrito-actualizado", fetchCarrito);
    return () => window.removeEventListener("carrito-actualizado", fetchCarrito);
  }, [usuarioActivo]);

  const handleQuantityChange = async (productoId: string, cantidad: number) => {
    if (!usuarioActivo || cantidad < 1) return;

    try {
      await axios.put(
        `/api/v2/carritos/usuario/${usuarioActivo.id}/producto/${productoId}`,
        null,
        { params: { cantidad } }
      );
      fetchCarrito();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = async (productoId: string) => {
    if (!usuarioActivo) return;
    try {
      await axios.delete(`/api/v2/carritos/usuario/${usuarioActivo.id}/producto/${productoId}`);
      fetchCarrito();
    } catch (err) {
      console.error(err);
    }
  };

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  return (
    <>
      <Header />
      <main className="carrito-main">
        <h1>Mi carrito de compras</h1>

        {carrito.length === 0 ? (
          <p className="carrito-vacio">Tu carrito está vacío 🛒</p>
        ) : (
          <div className="carrito-lista">
            {carrito.map((p) => (
              <div key={p.id} className="producto-carrito">
                <div className="producto-info">
                  <span>{p.nombre}</span>
                  <span>Precio: ${p.precio}</span>
                  <span>Subtotal: ${p.precio * p.cantidad}</span>
                  <div>
                    <button onClick={() => handleQuantityChange(p.id, p.cantidad - 1)} disabled={p.cantidad <= 1}>-</button>
                    <span>{p.cantidad}</span>
                    <button onClick={() => handleQuantityChange(p.id, p.cantidad + 1)}>+</button>
                    <button onClick={() => handleRemove(p.id)}>Eliminar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <h2>Total: ${total}</h2>
        <button onClick={() => navigate("/checkout")}>Ir a pagar</button>
      </main>
      <Footer />
    </>
  );
};

export default Carrito;
