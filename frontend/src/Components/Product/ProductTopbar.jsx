import { Button } from "@mui/material";
import React from "react";
import { FaTableCellsLarge } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";

const ProductTopbar = ({ setListView, listView, count, handleOpenDialog }) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex sm:flex-row justify-between sm:items-center gap-5 w-full px-[5vw] sm:px-0">
        <h1 className="text-xl font-bold">{`${count} Products`}</h1>

        <div className="flex gap-2">
          <div className="relative flex border rounded-lg overflow-hidden bg-gray-200 max-w-[25vw]">
            <div
              className={`absolute top-0 bottom-0 w-12 h-full bg-gray-400 transition-all duration-300 rounded-lg`}
              style={{
                transform: listView ? "translateX(48px)" : "translateX(0px)",
              }}
            ></div>

            <button
              className={`p-2 flex items-center justify-center w-12 h-10 z-10 cursor-pointer ${
                !listView ? "text-white" : "text-gray-700"
              }`}
              onClick={() => setListView(!listView)}
            >
              <FaTableCellsLarge className="text-lg" />
            </button>

            <button
              className={`flex items-center justify-center w-12 h-10 z-10 cursor-pointer ${
                listView ? "text-white" : "text-gray-700"
              }`}
              onClick={() => setListView(!listView)}
            >
              <IoMenu className="text-lg" />
            </button>
          </div>

          <Button
            variant="contained"
            className="w-[fit-content]"
            onClick={() => {
              console.log("Add Product button clicked");
              handleOpenDialog();
            }}
          >
            Add Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductTopbar;
