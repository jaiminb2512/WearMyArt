import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CheckOutInfo: {
    country: "India",
    streetAddress: "",
    apartment: "",
    city: "",
    postcode: "",
    phone: "",
    orderNotes: "",
    outOfStock: "Contact me (With delay)",
    heardAboutUs: "",
  },
  Products: {},
  selectedItems: {},
  TotalCost: 0,
};

const BuyProductSlice = createSlice({
  name: "BuyProduct",
  initialState,
  reducers: {
    updateCheckoutForm: (state, action) => {
      state.CheckOutInfo = { ...state.CheckOutInfo, ...action.payload };
    },
    resetCheckoutForm: (state) => {
      state.CheckOutInfo = initialState.CheckOutInfo;
    },
    addSelectedItems: (state, action) => {
      state.selectedItems = action.payload;
      state.TotalCost = Object.values(action.payload).reduce(
        (sum, item) => sum + item.orderData.Quantity * item.orderData.FinalCost,
        0
      );
    },
    addTotalCost: (state, action) => {
      state.TotalCost = action.payload;
    },
    addProducts: (state, action) => {
      state.Products = action.payload;
    },
  },
});

export const {
  updateCheckoutForm,
  resetCheckoutForm,
  addSelectedItems,
  addTotalCost,
  addProducts,
} = BuyProductSlice.actions;
export default BuyProductSlice.reducer;
