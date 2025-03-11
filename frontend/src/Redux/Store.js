import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import toastReducer from "./toastSlice";
import themeReducer from "./ThemeSlice";
import tempProductReducer from "./tempProductSlice";
import customizaionOptionsSlice from "./customizaionOptionsSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    toast: toastReducer,
    theme: themeReducer,
    tempProduct: tempProductReducer,
    updateCustomizaionOptions: customizaionOptionsSlice,
  },
});

export default store;
