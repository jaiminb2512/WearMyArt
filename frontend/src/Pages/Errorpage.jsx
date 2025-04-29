import React from "react";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import MTooltipButton from "../Components/MTooltipButton";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-red-500 px-4 py-2">
          <h2 className="text-white text-center text-xl font-bold">Error</h2>
        </div>

        <div className="p-6">
          <div className="flex justify-center mb-6">
            <div className="h-24 w-24 rounded-full bg-red-100 flex items-center justify-center">
              <ErrorOutlineIcon
                className="text-red-500"
                style={{ fontSize: 64 }}
              />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Oops! Page not found.
            </h1>
            <p className="text-gray-600">
              The page you’re looking for doesn’t exist, may have been moved, or
              is currently unavailable.
            </p>
          </div>

          <div className="flex flex-col gap-3 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
            <MTooltipButton
              onClick={() => navigate("/")}
              title="Go to Home"
              variant="contained"
              color="success"
              className="flex-1 px-4 py-2 font-medium rounded-md "
            >
              Go to Home
            </MTooltipButton>
            <MTooltipButton
              title="Refresh Page"
              variant="contained"
              color="ghost"
              onClick={() => window.location.reload()}
              className="flex-1 px-4 py-2 font-medium rounded-md "
            >
              Refresh Page
            </MTooltipButton>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>If this problem persists, please contact support:</p>
            <p className="font-medium">hello@wearmyart.com</p>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-gray-500">
        <p>Error Code: 404</p>
      </div>
    </div>
  );
};

export default ErrorPage;
