import React, { useState } from "react";
import { useSelector } from "react-redux";

const CheckoutForm = () => {
  const { user } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    country: "India",
    streetAddress: "",
    apartment: "",
    city: "",
    postcode: "",
    phone: "",
    orderNotes: "",
    outOfStock: "Contact me (With delay)",
    heardAboutUs: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };

    setFormData(newFormData);
  };

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Checkout</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="FirstName"
            value={user?.FullName || ""}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            disabled
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Country / Region *
        </label>
        <input
          type="text"
          name="country"
          value={formData.country}
          disabled
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 bg-gray-100 cursor-not-allowed"
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Street Address *
        </label>
        <input
          type="text"
          name="streetAddress"
          value={formData.streetAddress}
          onChange={handleChange}
          placeholder="House number and street name"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
        />
        <input
          type="text"
          name="apartment"
          value={formData.apartment}
          onChange={handleChange}
          placeholder="Apartment, suite, unit, etc. (optional)"
          className="mt-2 block w-full border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Town / City *
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Postcode / ZIP *
          </label>
          <input
            type="text"
            name="postcode"
            value={formData.postcode}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone (Optional)
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={user?.Email || ""}
            disabled
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Order Notes (Optional)
        </label>
        <textarea
          name="orderNotes"
          value={formData.orderNotes}
          onChange={handleChange}
          placeholder="Notes about your order, e.g. special notes for delivery."
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
        ></textarea>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          What would you like us to do if an Item is out of stock?
        </label>
        <select
          name="outOfStock"
          value={formData.outOfStock}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
        >
          <option>Contact me (With delay)</option>
          <option>Cancel item</option>
        </select>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Where did you hear about us?
        </label>
        <textarea
          name="heardAboutUs"
          value={formData.heardAboutUs}
          onChange={handleChange}
          placeholder="Enter details"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
        ></textarea>
      </div>
    </div>
  );
};

export default CheckoutForm;
