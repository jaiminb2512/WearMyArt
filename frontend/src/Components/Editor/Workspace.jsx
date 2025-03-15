import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useSelector } from "react-redux";
import * as fabric from "fabric";

const Workspace = forwardRef((props, ref) => {
  const tempProduct = useSelector((state) => state.tempProduct);
  const { Font, Text, Color, TextStyle, SelectedLayer } = tempProduct;

  const ProductImg = tempProduct?.ImgURL?.[0]
    ? `${import.meta.env.VITE_BASE_URL}${tempProduct.ImgURL[0]}`
    : "http://localhost:3000/uploads/ProductImages-1740638255560-756813806.jpg";

  const canvaRef = useRef(null);
  const fabricRef = useRef(null);
  const selectedObject = useRef(null);

  // Expose functions to parent component through ref
  useImperativeHandle(ref, () => ({
    addText,
    deleteSelected,
    saveDesign,
  }));

  useEffect(() => {
    if (!canvaRef.current) return;

    const canvas = new fabric.Canvas(canvaRef.current, {
      selection: true,
    });

    fabricRef.current = canvas;

    // Listen for object selection
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

  // Function to apply styles dynamically from TextStyles
  const applyTextStyles = (textObj, styles) => {
    if (!textObj) return;

    textObj.set({
      fontWeight: styles.includes("Bold") ? "bold" : "normal",
      fontStyle: styles.includes("Italic") ? "italic" : "normal",
      underline: styles.includes("Underline"),
      linethrough: styles.includes("Strikethrough"),
      shadow: styles.includes("Shadow") ? "2px 2px 5px rgba(0,0,0,0.5)" : null,
      stroke: styles.includes("Outline") ? "#000000" : null,
      strokeWidth: styles.includes("Outline") ? 2 : 0,
    });

    // Custom Effects
    if (styles.includes("Embossed")) {
      textObj.set({
        shadow:
          "1px 1px 2px rgba(255,255,255,0.5), -1px -1px 2px rgba(0,0,0,0.5)",
      });
    }

    if (styles.includes("Engraved")) {
      textObj.set({
        shadow:
          "-1px -1px 2px rgba(255,255,255,0.5), 1px 1px 2px rgba(0,0,0,0.5)",
      });
    }

    if (styles.includes("3D Effect")) {
      textObj.set({
        shadow: "3px 3px 3px rgba(0,0,0,0.6)",
      });
    }

    if (styles.includes("Glow")) {
      textObj.set({
        shadow: "0 0 10px rgba(255,255,255,0.8)",
      });
    }
  };

  // ✅ Add Text Element
  const addText = () => {
    if (!fabricRef.current || !Text) return;

    const canvas = fabricRef.current;
    const text = new fabric.Text(Text, {
      left: 50,
      top: 50,
      fontFamily: Font,
      fill: Color,
    });

    applyTextStyles(text, TextStyle); // Apply styles dynamically
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
  };

  // ✅ Update Selected Text when styles change
  useEffect(() => {
    if (!selectedObject.current) return;

    const obj = selectedObject.current;
    if (obj.type === "text") {
      obj.set({
        fontFamily: Font,
        fill: Color,
        text: Text, // Update text content
      });

      applyTextStyles(obj, TextStyle); // Apply styles dynamically
      fabricRef.current.renderAll();
    }
  }, [Font, Color, TextStyle, Text]);

  // ✅ Delete Selected Object
  const deleteSelected = () => {
    if (!fabricRef.current || !selectedObject.current) return;

    const canvas = fabricRef.current;
    canvas.remove(selectedObject.current);
    canvas.renderAll();
    selectedObject.current = null;
  };

  // ✅ Save Final Design
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
    <div className="flex flex-col items-center justify-center space-y-4 mt-4">
      {/* Canvas Area */}
      <div className="relative border shadow-lg rounded-lg p-2">
        <img
          src={ProductImg}
          alt="T-shirt"
          className="absolute w-[500px] h-[500px] object-cover rounded-md"
          style={{ zIndex: -1 }}
        />
        <canvas width="500" height="500" ref={canvaRef}></canvas>
      </div>
    </div>
  );
});

export default Workspace;
