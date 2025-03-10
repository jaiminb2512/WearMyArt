import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const tempProductSlice = createSlice({
  name: "tempProduct",
  initialState,
  reducers: {
    setProductData: (state, action) => action.payload,
    clearProductData: () => null,
  },
});

export const { setProductData, clearProductData } = tempProductSlice.actions;
export default tempProductSlice.reducer;
