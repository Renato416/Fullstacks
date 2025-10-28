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
    { img: silla, titulo: "Silla Gamer", cantidad: 1, valor: "$72.990" },
    { img: mando, titulo: "Mando Xbox", cantidad: 1, valor: "$79.990" },
    { img: escritorio, titulo: "Escritorio Gamer", cantidad: 1, valor: "$70.990" },
    { img: audifonos, titulo: "Audifonos con micrófono", cantidad: 1, valor: "$64.990" },
    { img: teclado, titulo: "Teclado gamer", cantidad: 1, valor: "$15.990" },
    { img: mause, titulo: "Mause Gamer", cantidad: 1, valor: "$28.990" },
    { img: monitor, titulo: "Monitor gamer", cantidad: 1, valor: "$134.990" },
    { img: mausepad, titulo: "Mause pads", cantidad: 1, valor: "$6.990" },
  ];

  return (
    <>
      <Header />
      <Busqueda />
      <section className="productos-container">
        {productos.map((prod, index) => (
          <Producto key={index} {...prod} />
        ))}
      </section>
      <Footer />
    </>
  );
};
