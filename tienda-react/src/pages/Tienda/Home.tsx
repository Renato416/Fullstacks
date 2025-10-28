import React from "react";
import { Header } from '../../components/Tienda/Header';
import { Busqueda } from '../../components/Tienda/Busqueda';
import { Producto } from '../../components/Tienda/Producto';
import { Footer } from '../../components/Tienda/Footer';

import "../../assets/CSS/Tienda/styles.css";
import "../../assets/CSS/Tienda/productos.css";
import "../../assets/CSS/Tienda/busqueda.css";

// Importa todas las imágenes de tus productos
import silla from "../assets/IMG/IMG-PRODUCTOS/silla.jpeg";
import mando from "../assets/IMG/IMG-PRODUCTOS/Mando.webp";
import escritorio from "../assets/IMG/IMG-PRODUCTOS/Escritorio.webp";
import audifonos from "../assets/IMG/IMG-PRODUCTOS/audifonos.jpeg";
import teclado from "../assets/IMG/IMG-PRODUCTOS/Teclado.webp";
import mause from "../assets/IMG/IMG-PRODUCTOS/Mause.webp";
import monitor from "../assets/IMG/IMG-PRODUCTOS/monitor.jpeg";
import mausepad from "../assets/IMG/IMG-PRODUCTOS/mausepad.avif";

export const Home: React.FC = () => {
  const productos = [
    { img: silla, nombre: "Silla Gamer", precio: 72990 },
    { img: mando, nombre: "Mando Xbox", precio: 79990 },
    { img: escritorio, nombre: "Escritorio Gamer", precio: 70990 },
    { img: audifonos, nombre: "Audifonos con micrófono", precio: 64990 },
    { img: teclado, nombre: "Teclado gamer", precio: 15990 },
    { img: mause, nombre: "Mause Gamer", precio: 28990 },
    { img: monitor, nombre: "Monitor gamer", precio: 134990 },
    { img: mausepad, nombre: "Mause pads", precio: 6990 },
  ];

  // Función que maneja agregar producto al carrito
  const handleAdd = (producto: any) => {
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    const index = carrito.findIndex((p: any) => p.nombre === producto.nombre);
    if (index >= 0) {
      carrito[index].cantidad++;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`${producto.nombre} agregado al carrito ✅`);
  };

  return (
    <>
      <Header />
      <Busqueda />
      <section className="productos-container">
        {productos.map((prod, index) => (
          <Producto
            key={index}
            nombre={prod.nombre}
            precio={prod.precio}
            img={prod.img}
            onAdd={() => handleAdd(prod)}
          />
        ))}
      </section>
      <Footer />
    </>
  );
};

