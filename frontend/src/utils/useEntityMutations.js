import { useDispatch } from "react-redux";
import { showPopup } from "../Redux/popupSlice";
import ApiURLS from "../Data/ApiURLS";
import { useApiMutation } from "./apiRequest";
import { useState } from "react";

export const useConfirmationPopup = () => {
  const dispatch = useDispatch();
  const showConfirmation = ({
    title,
    message,
    onConfirm,
    confirmText = "Confirm",
    confirmColor = "primary",
    cancelText = "Cancel",
  }) => {
    dispatch(
      showPopup({
        title,
        message,
        buttons: [
          {
            text: cancelText,
            color: "secondary",
          },
          {
            text: confirmText,
            color: confirmColor,
            onClick: onConfirm,
          },
        ],
      })
    );
  };
  return showConfirmation;
};

export const useProductMutations = (updateCallback) => {
  const discontinueProductsMutation = useApiMutation(
    ApiURLS.DiscontinueProducts.url,
    ApiURLS.DiscontinueProducts.method
  );
  const reContinueProductsMutation = useApiMutation(
    ApiURLS.RecontinueProducts.url,
    ApiURLS.RecontinueProducts.method
  );
  const showConfirmation = useConfirmationPopup();

  const handleDiscontinueProducts = async (product) => {
    showConfirmation({
      title: "Discontinue Product",
      message: `Are you sure you want to discontinue this product?`,
      confirmText: "Discontinue",
      confirmColor: "error",
      onConfirm: async () => {
        await discontinueProductsMutation.mutateAsync({
          Products: [product._id],
        });

        if (updateCallback) {
          updateCallback(product._id, true);
        }

        return true;
      },
    });
  };

  const handleReContinueProducts = async (product) => {
    showConfirmation({
      title: "Recontinue Product",
      message: `Are you sure you want to recontinue this product?`,
      confirmText: "Recontinue",
      confirmColor: "success",
      onConfirm: async () => {
        await reContinueProductsMutation.mutateAsync({
          Products: [product._id],
        });

        if (updateCallback) {
          updateCallback(product._id, false);
        }

        return true;
      },
    });
  };

  return {
    handleDiscontinueProducts,
    handleReContinueProducts,
    isLoading:
      discontinueProductsMutation.isLoading ||
      reContinueProductsMutation.isLoading,
  };
};

export const useUserMutations = (updateCallback) => {
  const blockUserMutation = useApiMutation(
    ApiURLS.BlockUsers.url,
    ApiURLS.BlockUsers.method
  );
  const unBlockUserMutation = useApiMutation(
    ApiURLS.UnblockUsers.url,
    ApiURLS.UnblockUsers.method
  );
  const showConfirmation = useConfirmationPopup();

  const handleBlockUser = async (user) => {
    showConfirmation({
      title: "Block User",
      message: `Are you sure you want to block "${
        user.FullName || user.email
      }"?`,
      confirmText: "Block",
      confirmColor: "error",
      onConfirm: async () => {
        await blockUserMutation.mutateAsync({ userIds: [user._id] });

        if (updateCallback) {
          updateCallback(user._id, true);
        }

        return true;
      },
    });
  };

  const handleUnBlockUser = async (user) => {
    showConfirmation({
      title: "Unblock User",
      message: `Are you sure you want to unblock "${
        user.FullName || user.email
      }"?`,
      confirmText: "Unblock",
      confirmColor: "success",
      onConfirm: async () => {
        await unBlockUserMutation.mutateAsync({ userIds: [user._id] });

        if (updateCallback) {
          updateCallback(user._id, false);
        }

        return true;
      },
    });
  };

  return {
    handleBlockUser,
    handleUnBlockUser,
    isLoading: blockUserMutation.isLoading || unBlockUserMutation.isLoading,
  };
};

export const useOrderMutations = (updateCallback) => {
  const updateOrderStatusMutation = useApiMutation(
    ApiURLS.UpdateOrderStatus.url,
    ApiURLS.UpdateOrderStatus.method
  );
  const showConfirmation = useConfirmationPopup();

  const handleMoveToNextStatus = async (order, currentStatus, nextStatus) => {
    const orderId = order.id || order._id;
    const orderName = `Order #${orderId}`;
    let title, message, confirmText, confirmColor;

    if (nextStatus === "Process" && currentStatus === "Pending") {
      title = "Accept Order";
      message = `Are you sure you want to accept "${orderName}"?`;
      confirmText = "Accept";
      confirmColor = "success";
    } else if (nextStatus === "Rejected" && currentStatus === "Pending") {
      title = "Reject Order";
      message = `Are you sure you want to reject "${orderName}"?`;
      confirmText = "Reject";
      confirmColor = "error";
    } else {
      title = `Update Order Status`;
      message = `Are you sure you want to move "${orderName}" from "${currentStatus}" to "${nextStatus}"?`;
      confirmText = "Update";
      confirmColor = "primary";
    }

    showConfirmation({
      title,
      message,
      confirmText,
      confirmColor,
      onConfirm: async () => {
        try {
          const updateUrl = ApiURLS.UpdateOrderStatus.url.replace(
            ":id",
            orderId
          );

          await updateOrderStatusMutation.mutateAsync({
            status: nextStatus,
            _url: updateUrl,
          });

          if (updateCallback) {
            updateCallback(orderId, nextStatus);
          }

          return true;
        } catch (error) {
          console.error("Error updating order status:", error);
          return false;
        }
      },
    });
  };

  return {
    handleMoveToNextStatus,
    isLoading: updateOrderStatusMutation.isLoading,
  };
};
