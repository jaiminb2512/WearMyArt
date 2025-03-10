import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./UserSlice";
import toastReducer from "./toastSlice";
import themeReducer from "./ThemeSlice";
import tempProductReducer from "./TempProductSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    toast: toastReducer,
    theme: themeReducer,
    tempProduct: tempProductReducer,
  },
});

export default store;
