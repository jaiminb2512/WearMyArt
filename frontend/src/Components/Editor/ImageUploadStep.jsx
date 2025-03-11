import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateProductData } from "../../Redux/tempProductSlice";
import ApiURLS from "../../Data/ApiURLS";

const ImageUploadStep = ({ setNextAllowed }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const tempProduct = useSelector((state) => state.tempProduct);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);

    if (!tempProduct._id) {
      console.error("Error: tempProduct._id is undefined");
      return;
    }

    const formData = new FormData();
    formData.append("CustomerImg", file);
    formData.append("ProductId", tempProduct._id);

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}${ApiURLS.InitiateOrder.url}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Upload Success:", response.data.success);
      if (response.data.success) {
        setNextAllowed(true);
        // Use updateProductData instead of setProductData to merge the new data
        dispatch(updateProductData(response.data.data));
      }
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center border w-full sm:w-[50vw] rounded-3xl h-[50vh]">
      <input
        type="file"
        accept="image/png, image/jpeg"
        className="mb-4"
        onChange={handleImageUpload}
        disabled={loading}
      />
      {image && (
        <img
          src={image}
          alt="Uploaded Preview"
          className="mt-4 h-[450px] object-cover rounded-lg"
        />
      )}
      {loading && <p className="text-blue-500">Uploading...</p>}
    </div>
  );
};

export default ImageUploadStep;
