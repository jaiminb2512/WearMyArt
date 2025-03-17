import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import SingleOrder from "../Components/OrderComponents/SingleOrder";
import { useFetchData } from "../utils/apiRequest";
import ApiURLS from "../Data/ApiURLS";
import SingleProduct from "../Components/ProductComponents/SingleProduct";
import SingleUser from "../Components/User/SingleUser";

const OrderDetails = () => {
  const location = useLocation();
  const order = location.state?.order;

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
    `productData-${order?.CustomerId}`,
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
    <div className="flex flex-col justify-center items-center w-full h-full mt-[5vh]">
      <div className="mx-auto p-4 w-full flex justify-center items-center">
        <SingleOrder
          order={order}
          allOrders={true}
          OrderDetails={true}
          handleFetchProduct={handleFetchProduct}
          handleFetchUser={handleFetchUser}
        />
      </div>
      <div className="">
        {showData === "product" && (
          <div>
            {isProductLoading && <p>Loading product data...</p>}
            {productData && (
              <SingleProduct Product={productData} allProducts={true} />
            )}
          </div>
        )}
      </div>
      <div className="mx-auto p-4">
        {showData === "user" && (
          <div className="w-full">
            {isUserLoading && <p>Loading User data...</p>}
            {userData && <SingleUser user={userData} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
