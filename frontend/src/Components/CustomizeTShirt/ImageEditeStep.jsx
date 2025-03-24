import React from "react";
import Workspace from "./Workspace";
import Options from "./Options";
import Layers from "./Layers";
import { useDispatch, useSelector } from "react-redux";
import {
  deletingText,
  setImgActive,
  setTextActive,
} from "../../Redux/tempProductSlice";

const ImageEditStep = () => {
  const workspaceRef = React.useRef();
  const dispatch = useDispatch();
  const { SelectedLayer, TextActive, ImgActive } = useSelector(
    (state) => state.tempProduct
  );

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
      console.log("photo");
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

  console.log("Photo", ImgActive);
  return (
    <div className="flex min-h-[50vh] w-full md:h-[75vh] gap-2 justify-center border p-3">
      <div className="w-[25%] border rounded-lg">
        <Layers
          addText={handleAddText}
          deleteSelected={handleDeleteSelected}
          saveDesign={handleSaveDesign}
          addImage={handleAddImage}
        />
      </div>
      <div className="w-[50%] border rounded-lg">
        <Workspace ref={workspaceRef} />
      </div>
      <div className="w-[25%] border rounded-lg">
        <Options />
      </div>
    </div>
  );
};

export default ImageEditStep;
