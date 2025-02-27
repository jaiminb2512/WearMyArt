import axios from "axios";
import { showToast } from "../Redux/toastSlice";

export const apiRequest = async (url, method, data, dispatch) => {
  try {
    const response = await axios({
      url: `${import.meta.env.VITE_BASE_URL}${url}`,
      method,
      data,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    dispatch(
      showToast({
        message: error?.response?.data?.message || "Something went wrong",
        variant: "error",
      })
    );
    return { success: false };
  }
};
