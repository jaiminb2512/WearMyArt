import React from "react";
import Workspace from "./Workspace";
import Options from "./Options";
import Layers from "./Layers";

const ImageEditStep = () => {
  // Import Workspace component instance
  const workspaceRef = React.useRef();

  // Functions to be passed to Options component
  const handleAddText = () => {
    if (workspaceRef.current) {
      workspaceRef.current.addText();
    }
  };

  const handleDeleteSelected = () => {
    if (workspaceRef.current) {
      workspaceRef.current.deleteSelected();
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
  };

  return (
    <div className="flex min-h-[50vh] max-h-[70vh] w-full gap-2 justify-center border p-3">
      <div className="w-[30vw] border ">
        <Layers
          addText={handleAddText}
          deleteSelected={handleDeleteSelected}
          saveDesign={handleSaveDesign}
          addImage={handleAddImage}
        />
        <Options
          addText={handleAddText}
          deleteSelected={handleDeleteSelected}
          saveDesign={handleSaveDesign}
          addImage={handleAddImage}
        />
      </div>
      <div className="flex-3">
        <Workspace ref={workspaceRef} />
      </div>
    </div>
  );
};

export default ImageEditStep;
