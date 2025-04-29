import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCustomerImg } from "../../Redux/tempProductSlice";
import { Tooltip } from "@mui/material";
import MTooltipButton from "../MTooltipButton";

const ImageUploadStep = ({ onClose }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validImageTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!validImageTypes.includes(file.type)) {
      setError("Only PNG, JPG and JPEG images are allowed.");
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

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      handleImageUpload({ target: { files: [file] } });
    }
  };

  const handleConfirm = () => {
    if (image) {
      dispatch(setCustomerImg(image));
      if (onClose) onClose();
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-md w-[90vw] md:w-[60vw] h-[90vh] md:h-[80vh] border">
      <div className="flex items-center p-4 border-b">
        <MTooltipButton
          title="Close"
          className="mr-4 text-gray-500"
          onClick={onClose}
          variant="text"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </MTooltipButton>
        <h1 className="text-xl font-medium flex-1 text-center">Add picture</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {image ? (
          <div className="flex flex-col items-center space-y-4">
            <img
              src={image}
              alt="Uploaded Preview"
              className="max-h-64 w-auto object-contain rounded-lg"
            />
            <MTooltipButton
              title="Confirm Image"
              color="success"
              variant="contained"
              onClick={handleConfirm}
              className="px-6 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors"
            >
              Confirm Image
            </MTooltipButton>
          </div>
        ) : (
          <>
            <div className="w-32 h-32 bg-green-50 rounded-full flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center">
                <svg
                  className="w-40 h-40 text-green-100"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                >
                  <circle cx="50" cy="35" r="20" />
                  <path d="M25,75 C25,58 75,58 75,75 L75,100 L25,100 Z" />
                </svg>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <label className="flex-1 cursor-pointer">
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleImageUpload}
                  disabled={loading}
                  className="hidden"
                />
                <div className="bg-green-50 text-green-800 rounded-full py-3 px-4 flex items-center justify-center hover:bg-green-100 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Upload from device
                </div>
              </label>
            </div>
          </>
        )}

        {loading && (
          <div className="mt-4 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          </div>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default ImageUploadStep;
