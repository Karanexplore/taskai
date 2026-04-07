import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <h3 className="product-title">{product.name}</h3>

      <p className="product-rating">⭐⭐⭐⭐☆ {product.rating || 4.5}</p>

      <div className="product-price-box">
        <span className="discount-price">${product.discountPrice || product.price}</span>
        {product.price && product.discountPrice && (
          <span className="original-price">${product.price}</span>
        )}
      </div>

      <Link to={`/products/${product._id}`} className="view-btn">
        View Details
      </Link>
    </div>
  );
}

export default ProductCard;