import { createSlice } from "@reduxjs/toolkit";
import * as fabric from "fabric";

const initialState = {
  canvas: null,
  selectedObject: null,
};

const CanvasFunctionSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setCanvas: (state, action) => {
      state.canvas = action.payload;
    },
    addText: (state, action) => {
      if (!state.canvas) return;
      const { text, font, color } = action.payload;
      const newText = new fabric.Text(text, {
        left: 50,
        top: 50,
        fontFamily: font,
        fill: color,
      });

      state.canvas.add(newText);
      state.canvas.setActiveObject(newText);
      state.canvas.renderAll();
    },
    addImage: (state, action) => {
      if (!state.canvas) return;
      const imgURL = action.payload;

      fabric.Image.fromURL(
        imgURL,
        (img) => {
          img.set({
            left: 100,
            top: 100,
            scaleX: 0.5,
            scaleY: 0.5,
            selectable: true,
          });

          state.canvas.add(img);
          state.canvas.setActiveObject(img);
          state.canvas.renderAll();
        },
        { crossOrigin: "Anonymous" }
      );
    },
    deleteSelected: (state) => {
      if (!state.canvas || !state.selectedObject) return;
      state.canvas.remove(state.selectedObject);
      state.canvas.renderAll();
      state.selectedObject = null;
    },
    saveDesign: (state, action) => {
      if (!state.canvas) return;
      const productImg = action.payload;

      const designImage = state.canvas.toDataURL({ format: "png", quality: 1 });
      const finalCanvas = document.createElement("canvas");
      finalCanvas.width = 300;
      finalCanvas.height = 300;
      const ctx = finalCanvas.getContext("2d");

      const bgImage = new Image();
      bgImage.crossOrigin = "Anonymous";
      bgImage.src = productImg;
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
    },
    setSelectedObject: (state, action) => {
      state.selectedObject = action.payload;
    },
  },
});

export const {
  setCanvas,
  addText,
  addImage,
  deleteSelected,
  saveDesign,
  setSelectedObject,
} = CanvasFunctionSlice.actions;

export default CanvasFunctionSlice.reducer;
