import React from "react";

interface ProductoProps {
  nombre: string;
  precio: number;
  img: string;
  onAdd: (producto: ProductoProps) => void;
}

export const Producto: React.FC<ProductoProps> = ({ nombre, precio, img, onAdd }) => {
  return (
    <div className="producto">
      <img src={img} alt={nombre} className="producto-img" />
      <p className="titulo">{nombre}</p>
      <p className="precio">${precio.toLocaleString()}</p>
      <button className="add-cart" onClick={() => onAdd({ nombre, precio, img, onAdd })}>
        Añadir
      </button>
    </div>
  );
};
