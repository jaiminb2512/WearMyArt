import React, { useState } from "react";

const ProductImages = ({ imgs }) => {
  const [mainImage, setMainImage] = useState(imgs[0]);

  return (
    <section className="flex flex-col-reverse sm:flex-row">
      <div className="flex flex-row sm:flex-col mt-2 sm:justify-start w-1/3 ">
        {imgs.length > 1 &&
          imgs.map((img, index) => (
            <img
              key={index}
              src={`${import.meta.env.VITE_BASE_URL}${img}`}
              alt={`Thumbnail ${index}`}
              className={`w-[80px] h-[80px] object-cover cursor-pointer border-2 rounded-md transition-all hover:opacity-75 ${
                mainImage === img ? "border-blue-500" : "border-transparent"
              }`}
              onClick={() => setMainImage(img)}
            />
          ))}
      </div>
      <img
        src={`${import.meta.env.VITE_BASE_URL}${mainImage}`}
        alt="Main product"
        className="h-full  w-full sm:w-[300px] sm:h-[40vh] object-cover rounded-lg shadow-lg "
      />
    </section>
  );
};

export default ProductImages;
