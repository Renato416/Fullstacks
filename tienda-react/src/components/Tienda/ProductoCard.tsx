import React from "react";
import "../../assets/CSS/Tienda/styles.css";
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
      <h3 className="producto-titulo">{title}</h3>
      <p className="producto-valor">{price}</p>
    </div>
  );
};

export default ProductCard;

