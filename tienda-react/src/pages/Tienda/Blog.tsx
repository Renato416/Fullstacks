import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Tienda/Header";
import Footer from "../../components/Tienda/Footer";

interface Noticia {
  img: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  link: string;
}

const noticias: Noticia[] = [
  {
    img: "/assets/IMG-NOTICIAS/ofertas-gamer.jpg",
    titulo: "¡Semana de Ofertas Gamer!",
    descripcion: "Descuentos especiales en periféricos, sillas y monitores. ¡Equipa tu setup al mejor precio!",
    fecha: "Publicado el 25/10/2025",
    link: "/noticia1",
  },
  {
    img: "/assets/IMG-NOTICIAS/evento-gamer.jpg",
    titulo: "Evento “LEVEL-UP EXPERIENCE”",
    descripcion: "Ven a probar los últimos productos gamer y participa por premios exclusivos.",
    fecha: "Publicado el 20/10/2025",
    link: "/noticia2",
  },
];

const Blog: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    const totalItems = carrito.reduce((acc: number, producto: any) => acc + producto.cantidad, 0);
    const contador = document.querySelector(".carrito-text");
    if (contador) contador.textContent = `Productos (${totalItems})`;
  }, []);

  return (
    <>
      <Header />
      <main className="blog-container">
        <h2 className="blog-titulo">📰 Noticias y Actualizaciones</h2>

        <div className="noticias-grid">
          {noticias.map((n, index) => (
            <div
              key={index}
              className="noticia-card"
              onClick={() => navigate(n.link)}
              style={{ cursor: "pointer" }}
            >
              <img src={n.img} alt={n.titulo} className="noticia-img" />
              <div className="noticia-texto">
                <h3>{n.titulo}</h3>
                <p>{n.descripcion}</p>
                <span className="noticia-fecha">{n.fecha}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
