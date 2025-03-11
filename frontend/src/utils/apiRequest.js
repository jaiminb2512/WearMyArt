import axios from "axios";
import { showToast } from "../Redux/toastSlice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export const apiRequest = async (url, method, data = {}, dispatch) => {
  console.log(`${import.meta.env.VITE_BASE_URL}${url}`);

  try {
    const response = await axios({
      url: `${import.meta.env.VITE_BASE_URL}${url}`,
      method,
      data: Object.keys(data).length ? data : undefined,
      withCredentials: true,
    });

    console.log("API Response:", response);

    if (response.data.success) {
      dispatch(
        showToast({
          message: response.data.message || "Request successful",
          variant: "success",
        })
      );
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Something went wrong");
    }
  } catch (error) {
    console.error("API Error:", error);

    const errorMessage =
      error?.response?.data?.message || "Something went wrong";

    if (dispatch) {
      dispatch(
        showToast({
          message: errorMessage,
          variant: "error",
        })
      );
    }

    throw error;
  }
};

export const useFetchData = (Key, url, method, options = {}) => {
  const dispatch = useDispatch();
  const {
    enabled = true,
    staleTime = 1 * 60 * 1000,
    cacheTime = 10 * 60 * 1000,
  } = options;
  console.log("run");
  return useQuery({
    queryKey: [Key],
    queryFn: () => apiRequest(url, method, {}, dispatch),
    enabled,
    staleTime,
    cacheTime,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useApiMutation = (url, method) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (data) => apiRequest(url, method, data, dispatch),
  });
};
