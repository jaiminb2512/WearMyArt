import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as fabric from "fabric";

const Workspace = () => {
  const tempProduct = useSelector((state) => state.tempProduct);
  const ProductImg = tempProduct?.ImgURL?.[0]
    ? `${import.meta.env.VITE_BASE_URL}${tempProduct.ImgURL[0]}`
    : "http://localhost:3000/uploads/ProductImages-1740638255560-756813806.jpg";

  const canvaRef = useRef(null);
  const fabricRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!canvaRef.current) return;

    const canvas = new fabric.Canvas(canvaRef.current);
    fabricRef.current = canvas;

    return () => {
      canvas.dispose();
    };
  }, []);

  const addElement = () => {
    if (!fabricRef.current) return;

    const canvas = fabricRef.current;
    const circle = new fabric.Circle({
      radius: 30,
      fill: "#ffffff",
      top: 100,
      left: 100,
    });

    canvas.add(circle);
    canvas.renderAll();
    setCount(1);
  };

  const saveDesign = () => {
    if (!fabricRef.current) return;

    const fabricCanvas = fabricRef.current;
    const designImage = fabricCanvas.toDataURL({ format: "png", quality: 1 });

    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = 300;
    finalCanvas.height = 300;
    const ctx = finalCanvas.getContext("2d");

    // Load ProductImg onto the new canvas
    const bgImage = new Image();
    bgImage.crossOrigin = "Anonymous"; // Fix CORS issues
    bgImage.src = ProductImg;
    bgImage.onload = () => {
      ctx.drawImage(bgImage, 0, 0, 300, 300);

      // Load Fabric.js design on top
      const designImg = new Image();
      designImg.src = designImage;
      designImg.onload = () => {
        ctx.drawImage(designImg, 0, 0, 300, 300);

        // Convert to PNG and download
        const finalImage = finalCanvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = finalImage;
        link.download = "tshirt_design.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    };
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative border">
        <img
          src={ProductImg}
          alt="T-shirt"
          className="absolute w-[300px] h-[300px]"
          style={{ zIndex: -1 }}
        />
        <canvas width="300" height="300" ref={canvaRef}></canvas>
      </div>

      {count === 0 && (
        <div
          className="bg-black absolute top-[30%] h-[300px] w-[300px] opacity-20 flex justify-center items-center rounded-[50px] text-white cursor-pointer"
          onClick={addElement}
        >
          Click to add circle
        </div>
      )}

      <button
        onClick={saveDesign}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Save Design
      </button>
    </div>
  );
};

export default Workspace;
