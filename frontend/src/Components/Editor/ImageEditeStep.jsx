import React, { useEffect } from "react";
import Layers from "./Layers";
import Workspace from "./Workspace";
import Options from "./Options";
import { useSelector } from "react-redux";

const ImageEditStep = () => {
  return (
    <div className="flex w-full border">
      <div className="flex-1 border-r">
        <Layers />
      </div>
      <div className="flex-3 border-r">
        <Workspace />
      </div>
      <div className="flex-1">
        <Options />
      </div>
    </div>
  );
};

export default ImageEditStep;
