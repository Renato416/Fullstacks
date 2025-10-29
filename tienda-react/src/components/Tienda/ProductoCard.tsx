import React from "react";
import "../../assets/CSS/Tienda/productos.css";

interface ProductCardProps {
  img: string;
  title: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ img, title, price }) => {
  return (
    <div className="producto">
      <img src={img} alt={title} className="producto-img" />
      <div className="producto-titulo">{title}</div>
      <div className="producto-valor">{price}</div>
    </div>
  );
};

export default ProductCard;
