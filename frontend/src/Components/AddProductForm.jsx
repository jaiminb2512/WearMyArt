import React, { useState } from "react";
import axios from "axios";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    Size: "M",
    Price: "",
    DiscountedPrice: "",
    Sleeve: "full sleeve",
    Stock: "",
    Color: "",
    CustomizeOption: "Photo",
    ProductImages: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, ProductImages: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "ProductImages") {
        Array.from(formData.ProductImages).forEach((file) => {
          data.append("ProductImages", file);
        });
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      await axios.post("/api/add-product", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product added successfully!");
    } catch (error) {
      alert("Error adding product: " + error.response?.data?.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 border rounded-lg shadow-lg w-96 bg-base-100"
    >
      <h2 className="text-xl font-semibold mb-4">Add Product</h2>

      {/* Size */}
      <label className="label">
        <span className="label-text">Size:</span>
      </label>
      <select
        name="Size"
        value={formData.Size}
        onChange={handleChange}
        className="select select-bordered w-full"
      >
        {["XXL", "XL", "L", "M", "S"].map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>

      {/* Price */}
      <label className="label">
        <span className="label-text">Price:</span>
      </label>
      <input
        type="number"
        name="Price"
        value={formData.Price}
        onChange={handleChange}
        required
        className="input input-bordered w-full"
      />

      {/* Discounted Price */}
      <label className="label">
        <span className="label-text">Discounted Price:</span>
      </label>
      <input
        type="number"
        name="DiscountedPrice"
        value={formData.DiscountedPrice}
        onChange={handleChange}
        className="input input-bordered w-full"
      />

      {/* Sleeve */}
      <label className="label">
        <span className="label-text">Sleeve:</span>
      </label>
      <select
        name="Sleeve"
        value={formData.Sleeve}
        onChange={handleChange}
        className="select select-bordered w-full"
      >
        {["full sleeve", "half sleeve", "sleeveless"].map((sleeve) => (
          <option key={sleeve} value={sleeve}>
            {sleeve}
          </option>
        ))}
      </select>

      {/* Stock */}
      <label className="label">
        <span className="label-text">Stock:</span>
      </label>
      <input
        type="number"
        name="Stock"
        value={formData.Stock}
        onChange={handleChange}
        required
        className="input input-bordered w-full"
      />

      {/* Color */}
      <label className="label">
        <span className="label-text">Color:</span>
      </label>
      <input
        type="text"
        name="Color"
        value={formData.Color}
        onChange={handleChange}
        required
        className="input input-bordered w-full"
      />

      {/* Customize Option */}
      <label className="label">
        <span className="label-text">Customize Option:</span>
      </label>
      <select
        name="CustomizeOption"
        value={formData.CustomizeOption}
        onChange={handleChange}
        className="select select-bordered w-full"
      >
        {["Photo", "Text", "Both"].map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* Product Images */}
      <label className="label">
        <span className="label-text">Product Images:</span>
      </label>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        accept="image/*"
        className="file-input file-input-bordered w-full"
      />

      {/* Submit Button */}
      <button type="submit" className="mt-4 btn btn-primary w-full">
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;
