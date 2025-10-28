import React from "react";

interface ProductoProps {
  img: string;
  titulo: string;
  cantidad: number;
  valor: string;
}

export const Producto: React.FC<ProductoProps> = ({ img, titulo, cantidad, valor }) => {
  return (
    <div className="producto">
      <img src={img} alt={titulo} className="producto-img" />
      <h3 className="producto-titulo">{titulo}</h3>
      <p className="producto-cantidad">Cantidad: {cantidad}</p>
      <p className="producto-valor">{valor}</p>
    </div>
  );
};
