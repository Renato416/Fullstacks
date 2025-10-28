import React, { useEffect, useState } from "react";
import { Header } from "../../components/Tienda/Header";
import { Producto } from "../../components/Tienda/Producto";
import { Footer } from "../../components/Tienda/Footer";

// Importa todas las imágenes desde /assets
import audifonos from "../../assets/IMG/IMG-PRODUCTOS/audifonos.jpeg";
import silla from "../../assets/IMG/IMG-PRODUCTOS/silla.jpeg";
import escritorio from "../../assets/IMG/IMG-PRODUCTOS/Escritorio.webp";
import mando from "../../assets/IMG/IMG-PRODUCTOS/Mando.webp";
import mouse from "../../assets/IMG/IMG-PRODUCTOS/Mause.webp";
import mousepad from "../../assets/IMG/IMG-PRODUCTOS/mausepad.avif";
import monitor from "../../assets/IMG/IMG-PRODUCTOS/monitor.jpeg";
import teclado from "../../assets/IMG/IMG-PRODUCTOS/Teclado.webp";

interface ProductoCarrito {
  nombre: string;
  precio: number;
  img: string;
  cantidad: number;
}

export const ListaProductos: React.FC = () => {
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("carrito") || "[]");
    setCarrito(stored);
  }, []);

  const agregarAlCarrito = (producto: Omit<ProductoCarrito, "cantidad">) => {
    setCarrito((prev) => {
      const index = prev.findIndex((p) => p.nombre === producto.nombre);
      let updated;
      if (index >= 0) {
        updated = [...prev];
        updated[index].cantidad += 1;
      } else {
        updated = [...prev, { ...producto, cantidad: 1 }];
      }
      localStorage.setItem("carrito", JSON.stringify(updated));
      alert(`${producto.nombre} agregado al carrito ✅`);
      return updated;
    });
  };

  const productos = [
    { nombre: "Audifonos GAMER", precio: 64990, img: audifonos },
    { nombre: "Silla GAMER", precio: 72990, img: silla },
    { nombre: "Escritorio GAMER", precio: 70990, img: escritorio },
    { nombre: "Mando de Xbox GAMER", precio: 79990, img: mando },
    { nombre: "Mouse GAMER", precio: 28990, img: mouse },
    { nombre: "Mousepad GAMER", precio: 6990, img: mousepad },
    { nombre: "Monitor GAMER", precio: 134990, img: monitor },
    { nombre: "Teclado GAMER", precio: 15990, img: teclado },
  ];

  const totalProductos = carrito.reduce((acc, p) => acc + p.cantidad, 0);

  return (
    <>
      <Header carritoCount={totalProductos} />
      <main>
        <h2>PRODUCTOS</h2>
        <div className="productos-grid">
          {productos.map((prod) => (
            <Producto
              key={prod.nombre}
              nombre={prod.nombre}
              precio={prod.precio}
              img={prod.img}
              onAdd={agregarAlCarrito}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};
