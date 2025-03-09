import { useDispatch } from "react-redux";
import ApiURLS from "../Data/ApiURLS";
import { useApiMutation } from "./apiRequest";
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/UserSlice";

const useLogOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutMutation = useApiMutation(
    ApiURLS.Logout.url,
    ApiURLS.Logout.method
  );

  const logOut = async () => {
    try {
      await logoutMutation.mutateAsync({});
      localStorage.removeItem("RefreshToken");
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error.message);
      localStorage.removeItem("RefreshToken");
      dispatch(logout());
      navigate("/");
    }
  };

  return {
    logOut,
    isLoggingOut: logoutMutation.isPending,
  };
};

export default useLogOut;
