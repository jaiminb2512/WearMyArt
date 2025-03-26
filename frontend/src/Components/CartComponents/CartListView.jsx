import React, { useEffect, useState } from "react";
import { Button, IconButton, Typography, Checkbox } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ApiURLS from "../../Data/ApiURLS";
import { useApiMutation } from "../../utils/apiRequest";
import MTooltip from "../MTooltip";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedItems, addTotalCost } from "../../Redux/BuyProductSlice";
const CartListView = () => {
  const dispatch = useDispatch();
  const { selectedItems, Products, activeStep, buyNow } = useSelector(
    (state) => state.BuyProduct
  );
  let Items = Products;

  if (activeStep == 2 && selectedItems.length > 0) {
    Items = selectedItems;
  } else {
    Items = Products;
  }

  const updateCartMutation = useApiMutation(
    ApiURLS.UpdateCartQuantity.url,
    ApiURLS.UpdateCartQuantity.method
  );
  const removeCartMutation = useApiMutation(
    ApiURLS.RemoveCart.url,
    ApiURLS.RemoveCart.method
  );

  const handleQuantityChange = async (orderKey, newQuantity) => {
    if (newQuantity > 0) {
      try {
        await updateCartMutation.mutateAsync({
          orderKey,
          Quantity: newQuantity,
        });
      } catch (error) {
        console.error("Error updating cart quantity:", error);
      }
    }
  };

  const handleRemoveCartItem = async (orderKeys) => {
    await removeCartMutation.mutateAsync({ orderKeys });
  };

  const handleSelectItem = (item) => {
    let updatedItems = [...selectedItems];

    const index = updatedItems.findIndex(
      (selected) => selected.key === item.key
    );

    if (index !== -1) {
      updatedItems.splice(index, 1);
    } else {
      updatedItems.push(item);
    }

    dispatch(addSelectedItems(updatedItems));

    let total;
    if (updatedItems.length > 0) {
      total = updatedItems.reduce((sum, item) => {
        return sum + item.orderData.Quantity * item.orderData.FinalCost;
      }, 0);
    } else {
      total = Items.reduce((sum, item) => {
        return sum + item.orderData.Quantity * item.orderData.FinalCost;
      }, 0);
    }

    dispatch(addTotalCost(total));
  };

  console.log(Items);

  return (
    <div className="w-full p-4 flex flex-col justify-center items-center">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            {!(activeStep == 2) && <th className="p-2">Select</th>}
            <th className="p-2">Item</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Price</th>
            <th className="p-2">Subtotal</th>
            {!(activeStep == 2) && <th className="p-2">Remove</th>}
          </tr>
        </thead>
        <tbody>
          {Items.map((item) => (
            <tr key={item.key} className="text-center border-b">
              {!(activeStep == 2) && (
                <td className="p-2">
                  <Checkbox onChange={() => handleSelectItem(item)} />
                </td>
              )}
              <td className="p-2 flex items-center gap-2 justify-center">
                <img
                  src={
                    buyNow
                      ? item.orderData.FinalProductImg
                      : `${import.meta.env.VITE_BASE_URL}${
                          item.orderData.FinalProductImg
                        }`
                  }
                  alt="Product"
                  width="50"
                  height="50"
                  className="rounded"
                />
              </td>
              <td className="p-2">
                <div className="flex justify-center items-center gap-2">
                  {activeStep == 2 ? (
                    <div> {item.orderData.Quantity}X</div>
                  ) : (
                    <div className="flex justify-center items-center gap-2">
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleQuantityChange(
                            item.key,
                            Number(item.orderData.Quantity) - 1
                          )
                        }
                      >
                        <RemoveIcon />
                      </IconButton>
                      {item.orderData.Quantity}
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleQuantityChange(
                            item.key,
                            Number(item.orderData.Quantity) + 1
                          )
                        }
                      >
                        <AddIcon />
                      </IconButton>
                    </div>
                  )}
                </div>
              </td>
              <td className="p-2">₹{item.orderData.FinalCost}</td>
              <td className="p-2">
                ₹
                {(item.orderData.Quantity * item.orderData.FinalCost).toFixed(
                  2
                )}
              </td>
              {!(activeStep == 2) && (
                <td className="p-2">
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveCartItem([item.key])}
                  >
                    <DeleteIcon />
                  </IconButton>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {!(activeStep == 2) && (
        <div className="flex justify-between w-full gap-5 mt-4">
          <MTooltip title="Continue Shopping">
            <Button variant="contained" color="primary">
              Continue Shopping
            </Button>
          </MTooltip>
          <MTooltip title="Clear Cart">
            <Button
              variant="contained"
              color="error"
              onClick={() =>
                handleRemoveCartItem(Items.map((item) => item.key))
              }
            >
              Clear Cart
            </Button>
          </MTooltip>
        </div>
      )}
    </div>
  );
};

export default CartListView;
