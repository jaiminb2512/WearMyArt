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

  // Fixed: Added imageData parameter to pass to workspace component
  const handleAddImage = (imageData) => {
    if (workspaceRef.current && imageData) {
      workspaceRef.current.addImage(imageData);
    }
  };

  return (
    <div className="flex min-h-[50vh] max-h-[fit-content] w-full gap-2 justify-center border">
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
