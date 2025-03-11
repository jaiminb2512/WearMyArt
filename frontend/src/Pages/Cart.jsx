import { Button } from "@mui/material";
import React, { useState } from "react";

const Cart = () => {
  const [tableView, setTableView] = useState(false);
  return (
    <div className="flex-1 flex flex-col ">
      <div className="sticky top-15 w-full z-10 hidden  sm:block shadow-2xl">
        <div className=" hidden sm:flex gap-1 items-center w-full ml-2 px-[5vw] backdrop-blur-3xl pt-3 pb-2">
          <Button
            variant="contained"
            className="w-[fit-content]"
            onClick={() => setTableView(!tableView)}
          >
            {tableView ? "Grid View" : "Table View"}
          </Button>
        </div>
      </div>
      Cart
    </div>
  );
};

export default Cart;
