import React, { useState, useEffect } from "react";
import Header from "../../components/Tienda/Header";
import Footer from "../../components/Tienda/Footer";
import ProductCard from "../../components/Tienda/ProductoCard";

interface Product {
  img: string;
  title: string;
  price: string;
}

const productsData: Product[] = [
  { img: "/assets/IMG/audifonos.jpeg", title: "Audifonos GAMER", price: "$64.990" },
  { img: "/assets/IMG/silla.jpeg", title: "Silla GAMER", price: "$72.990" },
  { img: "/assets/IMG/Escritorio.webp", title: "Escritorio GAMER", price: "$70.990" },
  { img: "/assets/IMG/Mando.webp", title: "Mando de Xbox GAMER", price: "$79.990" },
  { img: "/assets/IMG/Mause.webp", title: "Mouse GAMER", price: "$28.990" },
  { img: "/assets/IMG/mausepad.avif", title: "Mousepad GAMER", price: "$6.990" },
  { img: "/assets/IMG/monitor.jpeg", title: "Monitor GAMER", price: "$134.990" },
  { img: "/assets/IMG/Teclado.webp", title: "Teclado GAMER", price: "$15.990" },
];

const ListaProducto: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(productsData);

  useEffect(() => {
    const filtered = productsData.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm]);

  return (
    <>
      <Header />

      <main>
        <h2>PRODUCTOS</h2>

        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="productos-grid">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={index}
              img={product.img}
              title={product.title}
              price={product.price}
            />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ListaProducto;
