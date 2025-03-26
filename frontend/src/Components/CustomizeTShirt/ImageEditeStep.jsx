import React, { useEffect } from "react";
import Workspace from "./Workspace";
import Options from "./Options";
import Layers from "./Layers";
import { useDispatch, useSelector } from "react-redux";
import {
  deletingText,
  resetTempProduct,
  setImgActive,
  setTextActive,
} from "../../Redux/tempProductSlice";

const ImageEditStep = () => {
  const workspaceRef = React.useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    resetTempProduct();
  }, []);
  const { SelectedLayer } = useSelector((state) => state.tempProduct);

  const handleAddText = () => {
    if (workspaceRef.current) {
      workspaceRef.current.addText();
    }
    dispatch(setTextActive());
  };

  const handleDeleteSelected = () => {
    if (workspaceRef.current) {
      workspaceRef.current.deleteSelected();
    }
    if (SelectedLayer == "Text") {
      dispatch(deletingText());
    }
    if (SelectedLayer == "Photo") {
      dispatch(setImgActive(false));
    }
  };

  const handleSaveDesign = () => {
    if (workspaceRef.current) {
      workspaceRef.current.saveDesign();
    }
  };
  const handleAddImage = () => {
    if (workspaceRef.current) {
      workspaceRef.current.addImage();
    }
    dispatch(setImgActive(true));
  };

  return (
    <div className="flex flex-col sm:flex-col md:flex-row h-ful w-full gap-4 p-4 border">
      <div className="w-full md:w-1/2 order-1 sm:order-1 md:order-2 overflow-hidden">
        <div className="md:border md:rounded-lg h-[50vh] md:h-[75vh] overflow-hidden">
          <Workspace ref={workspaceRef} />
        </div>
      </div>

      <div className="w-full md:w-1/4 order-3 sm:order-3 md:order-3">
        <div className="border rounded-lg h-full">
          <Options />
        </div>
      </div>

      <div className="w-full md:w-1/4 order-2 sm:order-2 md:order-1">
        <div className="border rounded-lg h-full">
          <Layers
            addText={handleAddText}
            deleteSelected={handleDeleteSelected}
            saveDesign={handleSaveDesign}
            addImage={handleAddImage}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageEditStep;
