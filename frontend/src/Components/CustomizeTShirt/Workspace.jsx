import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as fabric from "fabric";

const Workspace = forwardRef((props, ref) => {
  const tempProduct = useSelector((state) => state.tempProduct);
  const { Font, Text, Color, CustomerImg } = tempProduct;
  const dispatch = useDispatch();

  const ProductImg = tempProduct?.ImgURL?.[0]
    ? `${import.meta.env.VITE_BASE_URL}${tempProduct.ImgURL[0]}`
    : "http://localhost:3000/uploads/ProductImages-1740638255560-756813806.jpg";

  const canvaRef = useRef(null);
  const fabricRef = useRef(null);
  const selectedObject = useRef(null);

  useImperativeHandle(ref, () => ({
    addText,
    deleteSelected,
    saveDesign,
    addImage,
  }));

  useEffect(() => {
    if (!canvaRef.current) return;

    const canvas = new fabric.Canvas(canvaRef.current, {
      selection: true,
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
  }, []);

  const addText = () => {
    if (!fabricRef.current || !Text) return;

    const canvas = fabricRef.current;
    const text = new fabric.Text(Text, {
      left: 50,
      top: 50,
      fontFamily: Font,
      fill: Color,
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
    finalCanvas.width = 300;
    finalCanvas.height = 300;
    const ctx = finalCanvas.getContext("2d");

    const bgImage = new Image();
    bgImage.crossOrigin = "Anonymous";
    bgImage.src = ProductImg;
    bgImage.onload = () => {
      ctx.drawImage(bgImage, 0, 0, 300, 300);

      const designImg = new Image();
      designImg.src = designImage;
      designImg.onload = () => {
        ctx.drawImage(designImg, 0, 0, 300, 300);

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
        left: 50,
        top: 50,
        scaleX: 0.5,
        scaleY: 0.5,
      });

      canvas.add(fabricImage);
      canvas.setActiveObject(fabricImage);
      canvas.renderAll();
    };
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="relative shadow-lg rounded-lg p-2">
        <img
          src={ProductImg}
          alt="T-shirt"
          className="absolute w-[300px] h-[300px] object-cover rounded-md"
          style={{ zIndex: -1 }}
        />
        <canvas
          width="300"
          height="300"
          ref={canvaRef}
          className="border border-green"
        ></canvas>
      </div>
    </div>
  );
});

export default Workspace;
