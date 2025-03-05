import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SidebarData from "../Data/SidebarData";
import { Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const ProductSidebar = ({ setFilterOptions, filterOptions }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (category, option) => {
    const updatedFilterOptions = { ...filterOptions };
    const options = updatedFilterOptions[category];

    if (options.includes(option)) {
      updatedFilterOptions[category] = options.filter((opt) => opt !== option);
    } else {
      updatedFilterOptions[category] = [...options, option];
    }

    setFilterOptions(updatedFilterOptions);
  };

  const ClearFilter = () => {
    setFilterOptions({
      Size: [],
      Sleeve: [],
      CustomizeOption: [],
      Color: [],
    });
  };

  return (
    <div>
      <h1 className="text-xl font-bold">Filter</h1>
      {/* Mobile Sidebar Toggle Button */}
      <div className="sm:hidden fixed top-4 left-4 z-20">
        <IconButton
          onClick={() => setIsOpen(true)}
          className="text-white bg-gray-900"
        >
          <MenuIcon />
        </IconButton>
      </div>

      {/* Sidebar (Responsive) */}
      <div
        className={`fixed sm:relative top-0 left-0 h-screen w-[250px] bg-white dark:bg-gray-900 shadow-lg p-4 border-r transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 z-30`}
      >
        {/* Close Button (Only for mobile) */}
        <div className="sm:hidden flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Filters</h1>
          <IconButton
            onClick={() => setIsOpen(false)}
            className="text-white bg-gray-900"
          >
            <CloseIcon />
          </IconButton>
        </div>

        {/* Sidebar Content */}
        {SidebarData.map((data) => (
          <Accordion defaultExpanded key={data.title}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography component="span">{data.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex flex-col gap-2">
                {data.Options.map((option, idx) => (
                  <label key={idx} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={filterOptions[data.title]?.includes(option)}
                      onChange={() => handleCheckboxChange(data.title, option)}
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        ))}

        <div className="mt-2">
          <Button variant="contained" onClick={ClearFilter} fullWidth>
            Clear Filter
          </Button>
        </div>
      </div>

      {/* Overlay (For Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 sm:hidden z-20"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default ProductSidebar;
