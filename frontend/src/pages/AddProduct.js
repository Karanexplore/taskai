import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    discountPrice: "",
    image: "",
    category: "Casual",
    description: "",
    rating: 4.5,
    isNewArrival: true,
    isTopSelling: false,
    dressStyle: "Casual",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => {
      const updatedForm = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      if (name === "category") {
        updatedForm.dressStyle = value;
      }

      return updatedForm;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        price: Number(form.price),
        discountPrice: Number(form.discountPrice),
        rating: Number(form.rating),
      };

      await createProductApi(payload);

      alert("Product added successfully");

      // 👇 Home page pe bhej raha hu taaki turant visible ho
      navigate("/");
    } catch (error) {
      console.error("Add Product Error:", error);
      alert(error.message || "Failed to add product");
    }
  };

  return (
    <div className="auth-page container">
      <div className="auth-box add-product-box">
        <h2>Add Product</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Original Price"
            value={form.price}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="discountPrice"
            placeholder="Discount Price"
            value={form.discountPrice}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="Casual">Casual</option>
            <option value="Formal">Formal</option>
            <option value="Party">Party</option>
            <option value="Gym">Gym</option>
          </select>

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            required
          />

          <input
            type="number"
            step="0.1"
            name="rating"
            placeholder="Rating"
            value={form.rating}
            onChange={handleChange}
          />

          <label className="checkbox-row">
            <input
              type="checkbox"
              name="isNewArrival"
              checked={form.isNewArrival}
              onChange={handleChange}
            />
            New Arrival
          </label>

          <label className="checkbox-row">
            <input
              type="checkbox"
              name="isTopSelling"
              checked={form.isTopSelling}
              onChange={handleChange}
            />
            Top Selling
          </label>

          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;


