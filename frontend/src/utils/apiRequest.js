import axios from "axios";
import { showToast } from "../Redux/ToastSlice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export const apiRequest = async (
  url,
  method,
  data = {},
  dispatch,
  showToastMessage = true
) => {
  const apiUrl = data._url
    ? `${import.meta.env.VITE_BASE_URL}${data._url}`
    : `${import.meta.env.VITE_BASE_URL}${url}`;

  if (data._url) {
    const { _url, ...restData } = data;
    data = restData;
  }

  console.log(`Making API request to: ${apiUrl}`);

  try {
    const response = await axios({
      url: apiUrl,
      method,
      data: Object.keys(data).length ? data : undefined,
      withCredentials: true,
    });

    console.log("API Response:", response);

    if (response.data.success) {
      if (showToastMessage && dispatch) {
        dispatch(
          showToast({
            message: response.data.message || "Request successful",
            variant: "success",
          })
        );
      }
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Something went wrong");
    }
  } catch (error) {
    console.error("API Error:", error.message);

    const errorMessage =
      error?.response?.data?.message || "Something went wrong";

    if (showToastMessage && dispatch) {
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
  console.log(options);
  const dispatch = useDispatch();
  const {
    enabled = true,
    staleTime = 1 * 60 * 1000,
    cacheTime = 10 * 60 * 1000,
    showToastMessage = true,
  } = options;

  return useQuery({
    queryKey: [Key],
    queryFn: () => apiRequest(url, method, {}, dispatch, showToastMessage),
    enabled,
    staleTime,
    cacheTime,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useApiMutation = (url, method, options = {}) => {
  const dispatch = useDispatch();
  const { showToastMessage = true } = options;

  return useMutation({
    mutationFn: (data) =>
      apiRequest(
        url,
        method,
        data,
        dispatch,
        data?.showToastMessage ?? showToastMessage
      ),
  });
};
