import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SingleOrder from "../Components/OrderComponents/SingleOrder";
import { useFetchData } from "../utils/apiRequest";
import ApiURLS from "../Data/ApiURLS";
import SingleProduct from "../Components/ProductComponents/SingleProduct";
import SingleUser from "../Components/User/SingleUser";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import MTooltip from "../Components/MTooltip";

const OrderDetails = () => {
  const location = useLocation();
  const order = location.state?.order;
  const navigate = useNavigate();

  if (!order) {
    return (
      <div className="text-center text-gray-500 mt-10">
        <p>No order details available.</p>
      </div>
    );
  }

  const [showData, setShowData] = useState(null);

  const {
    data: productData,
    refetch: refetchProducts,
    isLoading: isProductLoading,
  } = useFetchData(
    `productData-${order?.ProductId}`,
    `${ApiURLS.GetSingleProduct.url}/${order?.ProductId}`,
    ApiURLS.GetSingleProduct.method,
    {
      enabled: false,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );

  const {
    data: userData,
    refetch: refetchUser,
    isLoading: isUserLoading,
  } = useFetchData(
    `userData-${order?.CustomerId}`,
    `${ApiURLS.GetSingleUser.url}/${order?.CustomerId}`,
    ApiURLS.GetSingleUser.method,
    {
      enabled: false,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );

  const handleFetchProduct = () => {
    setShowData("product");
    refetchProducts();
  };

  const handleFetchUser = () => {
    setShowData("user");
    refetchUser();
  };

  return (
    <div className="ml-[2vw]">
      <div className="left-0 w-full ml-[2vw] mt-[5vh] cursor-pointer">
        <MTooltip title="Go Back">
          <Button onClick={() => navigate(-1)} variant="outlined">
            <div className="flex gap-3">
              <ArrowBackIcon /> Go Back
            </div>
          </Button>
        </MTooltip>
      </div>

      <div className="flex flex-col justify-center items-center gap-4 w-full h-full mt-[2vh]">
        <div className="border rounded-2xl w-[80vw]">
          <SingleOrder
            order={order}
            allOrders={true}
            OrderDetails={true}
            handleFetchProduct={handleFetchProduct}
            handleFetchUser={handleFetchUser}
          />
        </div>
        {showData === "product" && (
          <div className="rounded-2xl w-[80vw]">
            {isProductLoading ? (
              <p className="text-center">Loading product data...</p>
            ) : (
              productData && (
                <SingleProduct Product={productData} allProducts={true} />
              )
            )}
          </div>
        )}
        {showData === "user" && (
          <div className="border rounded-2xl w-[80vw]">
            {isUserLoading ? (
              <p className="text-center">Loading User data...</p>
            ) : (
              userData && <SingleUser user={userData} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
