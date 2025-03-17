import React, { useState } from "react";

const ProductImages = ({ imgs = [], altNames = [] }) => {
  const [mainImage, setMainImage] = useState(imgs.length > 0 ? imgs[0] : "");

  return (
    <section className="flex flex-col-reverse sm:flex-row gap-2">
      <div className="flex flex-row sm:flex-col mt-2 sm:justify-start w-1/3 gap-2">
        {imgs.length > 1 &&
          imgs.map((img, index) => (
            <img
              key={index}
              src={`${import.meta.env.VITE_BASE_URL}${img}`}
              alt={altNames[index] || "Image"}
              className={`w-[80px] h-[80px] object-cover cursor-pointer border-2 rounded-md transition-all hover:opacity-75 ${
                mainImage === img ? "border-blue-500" : "border-transparent"
              }`}
              onClick={() => setMainImage(img)}
            />
          ))}
      </div>

      {mainImage ? (
        <img
          src={`${import.meta.env.VITE_BASE_URL}${mainImage}`}
          alt={altNames[0] || "Image"}
          className="h-full w-full sm:w-[300px] sm:h-[40vh] object-cover rounded-lg shadow-lg"
        />
      ) : (
        <div className="flex items-center justify-center h-[40vh] w-[300px] bg-gray-200 rounded-lg shadow-lg">
          <p className="text-gray-500">No Image Available</p>
        </div>
      )}
    </section>
  );
};

export default ProductImages;
