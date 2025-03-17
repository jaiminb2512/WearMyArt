import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageUploadStep from "./ImageUploadStep";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { setSelectedLayer } from "../../Redux/TempProductSlice";

const Layers = ({ addText, deleteSelected, saveDesign, addImage }) => {
  const { SelectedLayer, CustomizeOption } = useSelector(
    (state) => state.tempProduct
  );
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (CustomizeOption === "Text") {
      dispatch(setSelectedLayer("Text"));
    } else if (CustomizeOption === "Photo") {
      dispatch(setSelectedLayer("Photo"));
    } else if (CustomizeOption === "Both") {
      dispatch(setSelectedLayer("Text"));
    }
  }, [CustomizeOption, dispatch]);

  const handleLayerChange = (layerType) => {
    dispatch(setSelectedLayer(layerType));
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div className="flex flex-col w-40 w-full">
      {CustomizeOption === "Both" && (
        <h2 className="font-bold text-lg">Layers</h2>
      )}

      {CustomizeOption === "Both" && (
        <div className="flex gap-2 my-4">
          <button
            className={`px-4 py-2 rounded-lg shadow-md transition border w-full ${
              SelectedLayer === "Text"
                ? "bg-blue-500 text-white"
                : "bg-white border-blue-500 text-blue-500"
            }`}
            onClick={() => handleLayerChange("Text")}
          >
            Text
          </button>

          <button
            className={`px-4 py-2 rounded-lg shadow-md transition border w-full ${
              SelectedLayer === "Photo"
                ? "bg-green-500 text-white"
                : "bg-white border-green-500 text-green-500"
            }`}
            onClick={() => handleLayerChange("Photo")}
          >
            Photo
          </button>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        {SelectedLayer === "Text" && (
          <>
            <button
              onClick={addText}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition"
            >
              ➕ Add Text
            </button>
            <button
              onClick={deleteSelected}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition"
            >
              ❌ Delete
            </button>
          </>
        )}

        {SelectedLayer === "Photo" && (
          <div>
            <button
              onClick={handleOpenModal}
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
            >
              📷 Upload Image
            </button>
            <button
              onClick={addImage}
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
            >
              📷 Add to the canvas
            </button>
          </div>
        )}
      </div>

      {/* <button
        onClick={saveDesign}
        className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition mt-4"
      >
        Save Design
      </button> */}

      {/* Modal for image upload */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-lg shadow-lg">
          <ImageUploadStep onClose={handleCloseModal} addImage={addImage} />
        </Box>
      </Modal>
    </div>
  );
};

export default Layers;
