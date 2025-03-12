import React, { useEffect, useState } from "react";

const ProductImages = ({ imgs }) => {
  const [mainImage, setMainImage] = useState(imgs[0]);
  // console.log(imgs);

  return (
    <section className="flex gap-8 flex-col sm:flex-row">
      <img
        src={`${import.meta.env.VITE_BASE_URL}${mainImage}`}
        alt="Main product"
        className="h-[350px] w-[450px] sm:h-[60vh] rounded-lg shadow-lg"
      />
      <div className="flex flex-col gap-2 mt-2 justify-start">
        {imgs.length > 1 &&
          imgs.map((img, index) => (
            <img
              key={index}
              src={`${import.meta.env.VITE_BASE_URL}${img}`}
              alt={`Thumbnail ${index}`}
              className={`w-[80px] h-[80px]  object-cover cursor-pointer border-2 rounded-md transition-all hover:opacity-75 ${
                mainImage === img ? "border-blue-500" : "border-transparent"
              }`}
              onClick={() => setMainImage(img)}
            />
          ))}
      </div>
    </section>
  );
};

export default ProductImages;
