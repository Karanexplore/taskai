import React from "react";
import ProductCard from "./ProductCard";

function ProductSection({ title, products }) {
  return (
    <section className="product-section">
      <div className="container">
        <h2 className="section-title">{title}</h2>

        <div className="product-grid">
          {products?.slice(0, 4).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductSection;