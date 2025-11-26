import React, { useEffect, useState } from "react";
import ProductCard from "../Tienda/ProductoCard";
import axios from "axios";

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagenUrl: string; // Asegúrate que tu backend devuelva un campo de imagen
}

const ProductList: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get<Producto[]>(
          "http://localhost:8080/api/v2/productos"
        );
        setProductos(response.data);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div className="productos-container">
      {productos.map((prod) => (
        <ProductCard
          key={prod.id}
          img={prod.imagenUrl}
          title={prod.nombre}
          price={`$${prod.precio}`}
        />
      ))}
    </div>
  );
};

export default ProductList;
