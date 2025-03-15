import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCustomerImg } from "../../Redux/tempProductSlice";
import { Button, CircularProgress } from "@mui/material";

const ImageUploadStep = ({ onClose, addImage }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const validImageTypes = ["image/png", "image/jpeg"];
    if (!validImageTypes.includes(file.type)) {
      setError("Only PNG and JPEG images are allowed.");
      return;
    }

    setLoading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataURL = reader.result;
      setImage(imageDataURL);
      setError("");
      setLoading(false);
    };

    reader.onerror = () => {
      console.error("Error reading file.");
      setError("Failed to read the file. Please try again.");
      setLoading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleConfirm = () => {
    if (image) {
      // First update Redux state
      dispatch(setCustomerImg(image));

      // Then pass the image data directly to the addImage function
      if (addImage) addImage(image);

      // Finally close the modal
      if (onClose) onClose();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center border w-full sm:w-[50vw] rounded-3xl h-[60vh] p-5 space-y-4">
      <input
        type="file"
        accept="image/png, image/jpeg"
        className="mb-4"
        onChange={handleImageUpload}
        disabled={loading}
      />

      {loading && <CircularProgress color="primary" />}

      {error && <p className="text-red-500">{error}</p>}

      {image && (
        <img
          src={image}
          alt="Uploaded Preview"
          className="mt-4 max-h-[400px] w-auto object-contain rounded-lg border shadow-md"
        />
      )}

      {image && (
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="success"
          className="w-full"
        >
          Confirm Image
        </Button>
      )}
    </div>
  );
};

export default ImageUploadStep;
