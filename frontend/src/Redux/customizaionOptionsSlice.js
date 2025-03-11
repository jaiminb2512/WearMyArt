import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const customizaionOptionsSlice = createSlice({
  name: "customizaionOptions",
  initialState,
  reducers: {
    clearCustomizaionOptionsData: () => initialState,
    setCustomizaionOptionsData: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateCustomizaionOptionsData: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  clearCustomizaionOptionsData,
  setCustomizaionOptionsData,
  updateCustomizaionOptionsData,
} = customizaionOptionsSlice.actions;
export default customizaionOptionsSlice.reducer;
