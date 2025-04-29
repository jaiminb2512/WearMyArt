import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import toastSlice from "./ToastSlice";
import themeSlice from "./ThemeSlice";
import tempProductSlice from "./tempProductSlice";
import customizaionOptionsSlice from "./customizaionOptionsSlice";
import OpenCloseSlice from "./OpenCloseSlice";
import CanvasFunctionSlice from "./CanvasFunctionSlice";
import BuyProductSlice from "./BuyProductSlice";
import popupSlice from "./popupSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    toast: toastSlice,
    popup: popupSlice,
    theme: themeSlice,
    tempProduct: tempProductSlice,
    updateCustomizaionOptions: customizaionOptionsSlice,
    OpenClose: OpenCloseSlice,
    CanvasFunction: CanvasFunctionSlice,
    BuyProduct: BuyProductSlice,
  },
});

export default store;
