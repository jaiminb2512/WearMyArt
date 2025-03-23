import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Products: [],
  selectedItems: [],
  TotalCost: 0,
  activeStep: 0,
};

const BuyProductSlice = createSlice({
  name: "BuyProduct",
  initialState,
  reducers: {
    addSelectedItems: (state, action) => {
      state.selectedItems = action.payload;
      state.TotalCost = state.selectedItems.reduce(
        (sum, item) => sum + item.orderData.Quantity * item.orderData.FinalCost,
        0
      );
    },

    resetCartState: (state) => {
      state.selectedItems = [];
      state.activeStep = 0;
    },

    addTotalCost: (state, action) => {
      state.TotalCost = action.payload;
    },
    addProducts: (state, action) => {
      state.Products = action.payload;
    },
    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
    },
  },
});

export const {
  addSelectedItems,
  addTotalCost,
  addProducts,
  setActiveStep,
  resetCartState,
} = BuyProductSlice.actions;
export default BuyProductSlice.reducer;
