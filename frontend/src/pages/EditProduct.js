import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById, createProductApi } from "../utils/api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    discountPrice: "",
    image: "",
    category: "Casual",
    description: "",
    rating: 4.5,
  });

  // Load product data
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setForm(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      alert("Product updated successfully");
      navigate("/products");
    } catch (error) {
      console.error(error);
      alert("Update failed");
    }
  };

  return (
    <div className="auth-page container">
      <div className="auth-box">
        <h2>Edit Product</h2>

        <form onSubmit={handleUpdate} className="auth-form">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
          />

          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
          />

          <input
            name="discountPrice"
            value={form.discountPrice}
            onChange={handleChange}
            placeholder="Discount Price"
          />

          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />

          <button type="submit">Update Product</button>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;