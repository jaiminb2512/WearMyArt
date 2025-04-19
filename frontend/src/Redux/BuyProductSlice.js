import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Products: [],
  selectedItems: [],
  TotalCost: 0,
  activeStep: 0,
  buyNow: false,
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

    resetBuyProductSlice: (state) => {
      state.Products = [];
      state.selectedItems = [];
      state.TotalCost = 0;
      state.activeStep = 0;
      state.buyNow = false;
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
      if (state.buyNow) {
        state.TotalCost = action.payload[0].FinalCost;
      }
    },

    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
    },

    setBuyNow: (state, action) => {
      state.buyNow = action.payload;
    },

    updateQuantity: (state, action) => {
      const { key, quantity } = action.payload;
      const index = state.Products.findIndex((item) => item.key === key);
      if (index !== -1) {
        state.Products[index].orderData.Quantity = quantity;
      }

      if (index !== -1) {
        state.Products[index].orderData.Quantity = quantity;

        state.TotalCost = state.Products.reduce(
          (sum, item) =>
            sum + item.orderData.Quantity * item.orderData.FinalCost,
          0
        );
      }
    },

    removeProducts: (state, action) => {
      const keysToRemove = action.payload;
      state.Products = state.Products.filter(
        (item) => !keysToRemove.includes(item.key)
      );
      state.selectedItems = state.selectedItems.filter(
        (item) => !keysToRemove.includes(item.key)
      );

      state.TotalCost = state.selectedItems.reduce(
        (sum, item) => sum + item.orderData.Quantity * item.orderData.FinalCost,
        0
      );
    },
  },
});

export const {
  addSelectedItems,
  resetBuyProductSlice,
  addTotalCost,
  addProducts,
  setActiveStep,
  resetCartState,
  removeProducts,
  setBuyNow,
  updateQuantity,
} = BuyProductSlice.actions;
export default BuyProductSlice.reducer;
