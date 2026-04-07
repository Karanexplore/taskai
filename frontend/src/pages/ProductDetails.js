import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchProductById,
  addToCartApi,
  deleteProductApi,
} from "../utils/api";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToCartApi({
        productId: product._id,
        quantity: 1,
      });
      alert("Added to cart");
    } catch (error) {
      console.error(error);
      alert("Failed to add to cart");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProductApi(product._id);
      alert("Product deleted successfully");
      navigate("/products");
    } catch (error) {
      console.error("Delete Error:", error);
      alert(error.message || "Failed to delete product");
    }
  };

  const user = localStorage.getItem("token");

  if (!product) return <h2 className="container">Loading...</h2>;

  return (
    <div className="container details-page">
      <div className="details-layout">
        <img
          src={product.image}
          alt={product.name}
          className="details-image"
        />

        <div className="details-content">
          <h1>{product.name}</h1>
          <p className="details-desc">{product.description}</p>

          <div className="product-price-box">
            <span className="discount-price">${product.discountPrice}</span>
            {product.price && (
              <span className="original-price">${product.price}</span>
            )}
          </div>

          <p className="details-rating">⭐ {product.rating}</p>
          <p className="details-reviews">Reviews: {product.reviews || 120}</p>

          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
              marginTop: "20px",
            }}
          >
            <button className="shop-btn" onClick={handleAddToCart}>
              Add To Cart
            </button>

            {user && (
              <>
                <button
                  className="shop-btn"
                  onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                >
                  Edit Product
                </button>

                <button
                  className="shop-btn"
                  onClick={handleDelete}
                  style={{ background: "red", color: "#fff" }}
                >
                  Delete Product
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;