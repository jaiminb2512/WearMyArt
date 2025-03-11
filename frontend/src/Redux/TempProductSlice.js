import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: null,
  CustomerImg: null,
};

const tempProductSlice = createSlice({
  name: "tempProduct",
  initialState,
  reducers: {
    clearProductData: () => initialState,
    setProductData: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateProductData: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { clearProductData, setProductData, updateProductData } =
  tempProductSlice.actions;
export default tempProductSlice.reducer;
