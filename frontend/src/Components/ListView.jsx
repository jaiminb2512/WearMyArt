import React from "react";
import { NavLink } from "react-router-dom";
import ProductImages from "./Product/ProductImages";

const ListView = ({ rows, columns, isLoading }) => {
  // console.log("rows", rows);
  console.log("columns", columns);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Handle empty products
  if (!rows || rows.length === 0) {
    return (
      <div className="">
        <p className="text-center text-gray-500 text-lg">No items to display</p>
      </div>
    );
  }

  return (
    <section className="">
      <div className="grid gap-8 ">
        {rows.map((item) => {
          const {
            id,
            image,
            color,
            size,
            sleeve,
            price,
            discountedPrice,
            stock,
            customizeOption,
          } = item;

          return (
            <div
              key={id}
              className="grid md:grid-cols-2 gap-6 border rounded-lg overflow-hidden px-3"
            >
              <ProductImages imgs={image} />

              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-light capitalize">
                    {color} {sleeve} Item - Size {size}
                  </h3>
                  {stock <= 5 && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                      Low Stock: {stock} left
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 mb-4">
                  {discountedPrice !== "N/A" &&
                  parseFloat(discountedPrice) < parseFloat(price) ? (
                    <>
                      <p className="text-black font-medium text-lg">
                        ₹{discountedPrice}
                      </p>
                      <p className="text-gray-500 line-through">₹{price}</p>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        {Math.round(((price - discountedPrice) / price) * 100)}%
                        OFF
                      </span>
                    </>
                  ) : (
                    <p className="text-black font-medium text-lg">₹{price}</p>
                  )}
                </div>

                <div className="space-y-2 mb-6">
                  <p className="text-gray-700">
                    <span className="font-medium">Color:</span> {color}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Sleeve:</span> {sleeve}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Size:</span> {size}
                  </p>
                  {customizeOption && customizeOption !== "N/A" && (
                    <p className="text-gray-700">
                      <span className="font-medium">Customization:</span>{" "}
                      {customizeOption}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ListView;
