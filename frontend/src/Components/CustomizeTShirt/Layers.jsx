import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageUploadStep from "./ImageUploadStep";
import Modal from "@mui/material/Modal";
import { Box, Button } from "@mui/material";
import { setSelectedLayer } from "../../Redux/TempProductSlice";
import { AddCircleOutline, UploadFile, Delete } from "@mui/icons-material";
import { showToast } from "../../Redux/ToastSlice";

const Layers = ({ addText, deleteSelected, saveDesign, addImage }) => {
  const { SelectedLayer, CustomizeOption, CustomerImg } = useSelector(
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

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);

  const handleAddImg = () => {
    if (CustomerImg) {
      addImage();
    } else {
      dispatch(
        showToast({
          message: "Please upload image",
          variant: "error",
        })
      );
    }
  };

  return (
    <div className="flex flex-col w-full  p-4">
      <h1 className="text-lg">Layer</h1>

      {CustomizeOption == "Both" && <p>Select a layer to edit</p>}

      {CustomizeOption == "Both" && (
        <div className="flex flex-col gap-2 my-4">
          <button
            className={`px-4 py-2 rounded-lg shadow-md transition border w-full ${
              SelectedLayer === "Text"
                ? "bg-gray-500 text-white"
                : "bg-white border-green-500 text-green-500"
            }`}
            onClick={() => handleLayerChange("Text")}
          >
            Text
          </button>

          <button
            className={`px-4 py-2 rounded-lg shadow-md transition border w-full ${
              SelectedLayer === "Photo"
                ? "bg-gray-500 text-white"
                : "bg-white border-green-500 text-green-500"
            }`}
            onClick={() => handleLayerChange("Photo")}
          >
            Photo
          </button>
        </div>
      )}

      <div className="flex flex-col gap-2 w-full">
        {SelectedLayer === "Text" && (
          <div
            className="w-full flex items-center gap-5 cursor-pointer"
            onClick={addText}
          >
            <div className="w-[50px] h-[50px] bg-gray-200 border flex justify-center items-center rounded-xl">
              <h1 className="text-3xl">T</h1>
            </div>
            <p>Add Text</p>
          </div>
        )}

        {SelectedLayer === "Photo" && (
          <div className="flex flex-col gap-2">
            <div
              className="w-full flex items-center gap-5"
              onClick={handleOpenModal}
            >
              <div className="w-[50px] h-[50px] bg-gray-200 border flex justify-center items-center rounded-xl">
                <UploadFile />
              </div>
              <p>Upload Image</p>
            </div>
            <div
              className="w-full flex items-center gap-5 cursor-pointer"
              onClick={handleAddImg}
            >
              <div className="w-[50px] h-[50px] bg-gray-200 border flex justify-center items-center rounded-xl">
                <h1 className="text-3xl">📷 </h1>
              </div>
              <p>Add to the canvas</p>
            </div>
          </div>
        )}
        <div
          className="flex items-center gap-5 cursor-pointer"
          onClick={deleteSelected}
        >
          <div className="w-[50px] h-[50px] bg-gray-200 border flex justify-center items-center rounded-xl">
            <Delete />
          </div>
          <p>Delete {SelectedLayer}</p>
        </div>
      </div>

      {/* <button
        onClick={saveDesign}
        className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition mt-4"
      >
        Save Design
      </button> */}

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-lg shadow-lg">
          <ImageUploadStep onClose={handleCloseModal} addImage={addImage} />
        </Box>
      </Modal>
    </div>
  );
};

export default Layers;
