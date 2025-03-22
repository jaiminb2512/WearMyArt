import React, { useState } from "react";
import { Button, IconButton, Typography, Checkbox } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ApiURLS from "../../Data/ApiURLS";
import { useApiMutation } from "../../utils/apiRequest";
import MTooltip from "../MTooltip";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedItems, addTotalCost } from "../../Redux/BuyProductSlice";

const CartListView = ({ MyCart, isLoading = false, refetch = null }) => {
  const dispatch = useDispatch();
  const { selectedItems } = useSelector((state) => state.BuyProduct);

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
        refetch();
      } catch (error) {
        console.error("Error updating cart quantity:", error);
      }
    }
  };

  const handleRemoveCartItem = async (orderKeys) => {
    await removeCartMutation.mutateAsync({ orderKey: orderKeys });
    refetch();
  };

  const handleSelectItem = (item) => {
    const updatedItems = { ...selectedItems };

    if (updatedItems[item.key]) {
      delete updatedItems[item.key];
    } else {
      updatedItems[item.key] = item;
    }

    dispatch(addSelectedItems(updatedItems));

    if (Object.keys(updatedItems).length === 0) {
      const total = MyCart.reduce((sum, item) => {
        return sum + item.orderData.Quantity * item.orderData.FinalCost;
      }, 0);

      dispatch(addTotalCost(total));
    }
  };

  console.log(selectedItems);
  console.log(MyCart);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 flex flex-col justify-center items-center">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-2">Select</th>
            <th className="p-2">Item</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Price</th>
            <th className="p-2">Subtotal</th>
            <th className="p-2">Remove</th>
          </tr>
        </thead>
        <tbody>
          {MyCart.map((item) => (
            <tr key={item.key} className="text-center border-b">
              <td className="p-2">
                <Checkbox onChange={() => handleSelectItem(item)} />
              </td>
              <td className="p-2 flex items-center gap-2 justify-center">
                <img
                  src={`${import.meta.env.VITE_BASE_URL}${
                    item.orderData.FinalProductImg
                  }`}
                  alt="Product"
                  width="50"
                  height="50"
                  className="rounded"
                />
                <span>{item.orderData.CustomizeOption}</span>
              </td>
              <td className="p-2">
                <div className="flex justify-center items-center gap-2">
                  <IconButton
                    size="small"
                    onClick={() =>
                      handleQuantityChange(
                        item.key,
                        item.orderData.Quantity - 1
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
                        item.orderData.Quantity + 1
                      )
                    }
                  >
                    <AddIcon />
                  </IconButton>
                </div>
              </td>
              <td className="p-2">₹{item.orderData.FinalCost}</td>
              <td className="p-2">
                ₹
                {(item.orderData.Quantity * item.orderData.FinalCost).toFixed(
                  2
                )}
              </td>
              <td className="p-2">
                <IconButton
                  color="error"
                  onClick={() => handleRemoveCartItem([item.key])}
                >
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {refetch && (
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
                handleRemoveCartItem(MyCart.map((item) => item.key))
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

// {
//     "order:67b302978648f9218f4f3a88:1740231994804": {
//         "key": "order:67b302978648f9218f4f3a88:1740231994804",
//         "orderData": {
//             "ProductId": "67b301b48648f9218f4f3a82",
//             "CustomerId": "67b302978648f9218f4f3a88",
//             "Font": "Arial",
//             "FontSize": "15",
//             "Text": "Hello World",
//             "Color": "Gray",
//             "Quantity": "2",
//             "FinalCost": "1500",
//             "FinalProductImg": "uploads\\FinalProductImg-1740231994795-438229559.jpg"
//         }
//     },
//     "order:67b302978648f9218f4f3a88:1740232407980": {
//         "key": "order:67b302978648f9218f4f3a88:1740232407980",
//         "orderData": {
//             "ProductId": "67b301b48648f9218f4f3a82",
//             "CustomerId": "67b302978648f9218f4f3a88",
//             "Font": "Arial",
//             "FontSize": "15",
//             "Text": "Hello World",
//             "Color": "Gray",
//             "Quantity": "2",
//             "FinalCost": "1500",
//             "FinalProductImg": "uploads\\FinalProductImg-1740232407971-328173701.jpg"
//         }
//     }
// }
