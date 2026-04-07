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

  if (!product) return <h2 className="loader">Loading...</h2>;

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="product-detail-card">
          {/* LEFT IMAGE */}
          <div className="product-detail-image-wrap">
            <img
              src={product.image}
              alt={product.name}
              className="product-detail-image"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="product-detail-content">
            <p className="product-detail-label">SHOP.CO PRODUCT</p>

            <h1>{product.name}</h1>

            <p className="product-detail-desc">
              {product.description || "Premium quality fashion product with a stylish and modern design."}
            </p>

            <div className="product-detail-price-box">
              <span className="product-detail-discount">
                ${product.discountPrice || product.price}
              </span>

              {product.price && product.discountPrice && (
                <span className="product-detail-original">
                  ${product.price}
                </span>
              )}
            </div>

            <div className="product-detail-meta">
              <p className="product-detail-rating">⭐ {product.rating || 4.5}</p>
              <p className="product-detail-reviews">
                Reviews: {product.reviews || 120}
              </p>
            </div>

            <div className="product-detail-btn-group">
              <button
                className="product-detail-btn add-btn"
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>

              {user && (
                <>
                  <button
                    className="product-detail-btn edit-btn"
                    onClick={() =>
                      navigate(`/admin/edit-product/${product._id}`)
                    }
                  >
                    Edit Product
                  </button>

                  <button
                    className="product-detail-btn delete-btn"
                    onClick={handleDelete}
                  >
                    Delete Product
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
