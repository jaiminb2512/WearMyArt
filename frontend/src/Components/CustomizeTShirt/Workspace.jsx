import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as fabric from "fabric";
import { clearProductData, setSize } from "../../Redux/tempProductSlice";
import { showToast } from "../../Redux/ToastSlice";

const Workspace = forwardRef((props, ref) => {
  useEffect(() => {
    clearProductData();
  }, []);

  const tempProduct = useSelector((state) => state.tempProduct);
  const {
    Font,
    Text,
    TextStyle,
    Color,
    CustomerImg,
    TextActive,
    ImgActive,
    SelectedLayer,
  } = tempProduct;
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
        console.error("Error resizing canvas:", error.message);
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
    if (TextActive) {
      showToast({
        message: "Text is already added",
        variant: "error",
      });
      alert("Text is already added");
      return;
    }
    if (!fabricRef.current || !Text) return;

    const canvas = fabricRef.current;

    const text = new fabric.Text(Text, {
      left: canvasSize.width * 0.15,
      top: canvasSize.height * 0.15,
      fontFamily: Font,
      fill: Color,
      fontWeight: TextStyle.includes("Bold") ? "bold" : "normal",
      fontStyle: TextStyle.includes("Italic") ? "italic" : "normal",
      underline: TextStyle.includes("Underline"),
      linethrough: TextStyle.includes("Strikethrough"),
      overline: TextStyle.includes("Overline"),
      charSpacing: TextStyle.includes("Wide Spacing")
        ? 100
        : TextStyle.includes("Narrow Spacing")
        ? -50
        : 0,
      stroke: TextStyle.includes("Outline") ? "black" : "",
      strokeWidth: TextStyle.includes("Outline") ? 2 : 0,
      shadow: getTextShadow(TextStyle),
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
  };

  // Function to get the appropriate shadow style
  const getTextShadow = (styles) => {
    if (styles.includes("Shadow")) {
      return new fabric.Shadow({
        color: "rgba(0,0,0,0.5)",
        blur: 5,
        offsetX: 2,
        offsetY: 2,
      });
    }
    if (styles.includes("Embossed")) {
      return new fabric.Shadow({
        color: "rgba(255,255,255,1)",
        blur: 10,
        offsetX: -2,
        offsetY: -2,
      });
    }
    if (styles.includes("Engraved")) {
      return new fabric.Shadow({
        color: "rgba(0,0,0,1)",
        blur: 10,
        offsetX: 10,
        offsetY: 10,
      });
    }
    if (styles.includes("Glow")) {
      return new fabric.Shadow({
        color: "rgba(255,255,0,0.8)",
        blur: 20,
        offsetX: 0,
        offsetY: 0,
      });
    }
    return null;
  };

  const deleteSelected = () => {
    if (!fabricRef.current) return;

    const canvas = fabricRef.current;
    const objects = canvas.getObjects();

    if (SelectedLayer === "Text") {
      objects.forEach((obj) => {
        if (obj.type === "text") {
          canvas.remove(obj);
        }
      });
    } else if (SelectedLayer === "Photo") {
      objects.forEach((obj) => {
        if (obj.type === "image") {
          canvas.remove(obj);
        }
      });
    }

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
    if (ImgActive) {
      showToast({
        message: "Image is already added",
        variant: "error",
      });
      alert("Image is already ");
      return;
    }
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

  useEffect(() => {
    if (!fabricRef.current) return;

    const canvas = fabricRef.current;
    const objects = canvas.getObjects();

    objects.forEach((obj) => {
      if (obj.type === "text") {
        obj.set("fontFamily", Font);

        obj.set("fontWeight", TextStyle.includes("Bold") ? "bold" : "normal");
        obj.set(
          "fontStyle",
          TextStyle.includes("Italic") ? "italic" : "normal"
        );
        obj.set("underline", TextStyle.includes("Underline"));
        obj.set("linethrough", TextStyle.includes("Strikethrough"));
        obj.set("overline", TextStyle.includes("Overline"));

        obj.set(
          "charSpacing",
          TextStyle.includes("Wide Spacing")
            ? 100
            : TextStyle.includes("Narrow Spacing")
            ? -50
            : 0
        );

        if (TextStyle.includes("Outline")) {
          obj.set("stroke", "black");
          obj.set("strokeWidth", 2);
        } else {
          obj.set("strokeWidth", 0);
        }

        if (TextStyle.includes("Shadow")) {
          obj.set(
            "shadow",
            new fabric.Shadow({
              color: "rgba(0,0,0,0.5)",
              blur: 5,
              offsetX: 2,
              offsetY: 2,
            })
          );
        } else {
          obj.set("shadow", null);
        }

        if (TextStyle.includes("Embossed")) {
          obj.set(
            "shadow",
            new fabric.Shadow({
              color: "rgba(255,255,255,1)",
              blur: 10,
              offsetX: -2,
              offsetY: -2,
            })
          );
        }

        if (TextStyle.includes("Engraved")) {
          obj.set(
            "shadow",
            new fabric.Shadow({
              color: "rgba(0,0,0,1)",
              blur: 10,
              offsetX: 10,
              offsetY: 10,
            })
          );
        }

        if (TextStyle.includes("Glow")) {
          obj.set(
            "shadow",
            new fabric.Shadow({
              color: "rgba(255,255,0,0.8)",
              blur: 20,
              offsetX: 0,
              offsetY: 0,
            })
          );
        }
      }
    });

    canvas.renderAll();
  }, [Font, TextStyle]);

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
