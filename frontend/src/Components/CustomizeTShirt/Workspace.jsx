import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as fabric from "fabric";
import {
  clearProductData,
  setFinalProductImg,
  setSize,
} from "../../Redux/tempProductSlice";

const Workspace = forwardRef((props, ref) => {
  useEffect(() => {
    clearProductData();
  }, []);

  const tempProduct = useSelector((state) => state.tempProduct);
  const { Font, Text, Color, CustomerImg } = tempProduct;
  const dispatch = useDispatch();

  const [canvasSize, setCanvasSize] = useState({
    width: 300,
    height: 300,
  });

  const ProductImg =
    // `${import.meta.env.VITE_BASE_URL}${tempProduct?.ProductImg}` ||
    "http://localhost:3000/uploads/ProductImages-1740638255560-756813806.jpg";

  const canvaRef = useRef(null);
  const fabricRef = useRef(null);
  const selectedObject = useRef(null);
  const containerRef = useRef(null);

  const updateCanvasSize = () => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    const size = Math.min(containerWidth, containerHeight, 600);
    dispatch(setSize(size));

    setCanvasSize({
      width: size,
      height: size,
    });

    if (fabricRef.current) {
      try {
        fabricRef.current.setWidth(size);
        fabricRef.current.setHeight(size);
        fabricRef.current.renderAll();
      } catch (error) {
        console.error("Error resizing canvas:", error);
      }
    }
  };

  useEffect(() => {
    updateCanvasSize();

    window.addEventListener("resize", updateCanvasSize);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    addText,
    deleteSelected,
    saveDesign,
    addImage,
  }));

  useEffect(() => {
    if (!canvaRef.current) return;

    if (fabricRef.current) {
      fabricRef.current.dispose();
    }

    const canvas = new fabric.Canvas(canvaRef.current, {
      selection: true,
      width: canvasSize.width,
      height: canvasSize.height,
    });

    fabricRef.current = canvas;

    canvas.on("selection:created", (event) => {
      selectedObject.current = event.selected[0];
    });

    canvas.on("selection:updated", (event) => {
      selectedObject.current = event.selected[0];
    });

    canvas.on("selection:cleared", () => {
      selectedObject.current = null;
    });

    return () => {
      canvas.dispose();
    };
  }, [canvasSize]);

  const addText = () => {
    if (!fabricRef.current || !Text) return;

    const canvas = fabricRef.current;
    const text = new fabric.Text(Text, {
      left: canvasSize.width * 0.15,
      top: canvasSize.height * 0.15,
      fontFamily: Font,
      fill: Color,
      fontSize: canvasSize.width * 0.05,
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
  };

  const deleteSelected = () => {
    if (!fabricRef.current || !selectedObject.current) return;

    const canvas = fabricRef.current;
    canvas.remove(selectedObject.current);
    canvas.renderAll();
    selectedObject.current = null;
  };

  const saveDesign = () => {
    if (!fabricRef.current) return;

    const fabricCanvas = fabricRef.current;
    const designImage = fabricCanvas.toDataURL({ format: "png", quality: 1 });

    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = canvasSize.width;
    finalCanvas.height = canvasSize.height;
    const ctx = finalCanvas.getContext("2d");

    const bgImage = new Image();
    bgImage.crossOrigin = "Anonymous";
    bgImage.src = ProductImg;
    bgImage.onload = () => {
      ctx.drawImage(bgImage, 0, 0, canvasSize.width, canvasSize.height);

      const designImg = new Image();
      designImg.src = designImage;
      designImg.onload = () => {
        ctx.drawImage(designImg, 0, 0, canvasSize.width, canvasSize.height);

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

  const addImage = () => {
    if (!CustomerImg) {
      console.log("img not found");
      return;
    }

    const canvas = fabricRef.current;

    const imgObj = new Image();
    imgObj.src = CustomerImg;

    imgObj.onload = () => {
      const fabricImage = new fabric.Image(imgObj, {
        left: canvasSize.width * 0.15,
        top: canvasSize.height * 0.15,
        scaleX: canvasSize.width / (imgObj.width * 2),
        scaleY: canvasSize.height / (imgObj.height * 2),
      });

      canvas.add(fabricImage);
      canvas.setActiveObject(fabricImage);
      canvas.renderAll();
    };
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center h-full w-full p-2"
    >
      <div className="relative shadow-lg rounded-lg p-2 flex justify-center items-center w-full h-full">
        <img
          src={ProductImg}
          alt="T-shirt"
          style={{
            position: "absolute",
            width: canvasSize.width,
            height: canvasSize.height,
            objectFit: "cover",
            borderRadius: "0.375rem",
            zIndex: -1,
          }}
        />
        <canvas
          width={canvasSize.width}
          height={canvasSize.height}
          ref={canvaRef}
          className="border border-green "
        ></canvas>
      </div>
    </div>
  );
});

export default Workspace;
