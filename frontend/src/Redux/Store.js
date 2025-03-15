import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import toastReducer from "./ToastSlice";
import themeReducer from "./ThemeSlice";
import tempProductReducer from "./tempProductSlice";
import customizaionOptionsSlice from "./customizaionOptionsSlice";
import OpenCloseSlice from "./OpenCloseSlice";
import CanvasFunctionSlice from "./CanvasFunctionSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    toast: toastReducer,
    theme: themeReducer,
    tempProduct: tempProductReducer,
    updateCustomizaionOptions: customizaionOptionsSlice,
    OpenClose: OpenCloseSlice,
    CanvasFunction: CanvasFunctionSlice,
  },
});

export default store;
