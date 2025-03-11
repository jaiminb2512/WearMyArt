import React from "react";
import { useSelector } from "react-redux";

const Workspace = () => {
  const tempProduct = useSelector((state) => state.tempProduct);

  return (
    <div className="flex flex-col sm:flex-row gap-[5vw] w-full">
      <img
        // src={`${import.meta.env.VITE_BASE_URL}${tempProduct?.ImgURL[0]}`}
        src=""
        alt=""
        srcSet=""
        className="mt-4 w-[500px] h-[500px] object-cover rounded-lg"
      />
      <div>
        {tempProduct.CustomerImg && (
          <img
            src={`${import.meta.env.VITE_BASE_URL}${tempProduct.CustomerImg}`}
            alt="Uploaded Preview"
            className="mt-4 h-[100px] object-cover rounded-lg"
          />
        )}
      </div>
    </div>
  );
};

export default Workspace;
