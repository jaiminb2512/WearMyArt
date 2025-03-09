import React, { useState } from "react";
import { BsFilter, BsSortDown } from "react-icons/bs";
import {
  Button,
  Drawer,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IoIosCloseCircle } from "react-icons/io";

const ProductBottomBar = ({
  sortOrder,
  setSortOrder,
  setFilterOptions,
  filterOptions,
  FilterData,
}) => {
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(sortOrder);

  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
    setSortOrder(event.target.value);
    setSortOpen(false);
  };

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

  const handleRadioChange = (category, option) => {
    const updatedFilterOptions = { ...filterOptions };
    updatedFilterOptions[category] = [option];
    setFilterOptions(updatedFilterOptions);
  };

  const ClearFilter = () => {
    const initialFilterOptions = {
      Size: [],
      Sleeve: [],
      CustomizeOption: [],
      Color: [],
      Price: [],
    };
    setFilterOptions(initialFilterOptions);
  };

  return (
    <div>
      <div className="fixed bottom-0 left-0 w-full flex justify-around px-[5vw] shadow-md py-2 z-50 cursor-pointer bg-white">
        <div
          className="flex flex-col items-center pb-1"
          onClick={() => setSortOpen(true)}
        >
          <BsSortDown size={20} />
          <span className="text-xs">Sort</span>
        </div>

        <div
          className="flex flex-col items-center pb-1"
          onClick={() => setFilterOpen(true)}
        >
          <BsFilter size={20} />
          <span className="text-xs">Filter</span>
        </div>
      </div>

      <Drawer
        anchor="bottom"
        open={sortOpen}
        onClose={() => setSortOpen(false)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            overflow: "hidden",
          },
        }}
      >
        <div className="p-4 w-full max-w-md mx-auto">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold mb-3">Sort by</h2>
            <IoIosCloseCircle
              className="text-2xl cursor-pointer"
              onClick={() => setSortOpen(false)}
            />
          </div>

          <FormControl component="fieldset">
            <RadioGroup value={selectedSort} onChange={handleSortChange}>
              <FormControlLabel
                value="highToLow"
                control={<Radio />}
                label="Price: High to Low"
              />
              <FormControlLabel
                value="lowToHigh"
                control={<Radio />}
                label="Price: Low to High"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </Drawer>

      <Drawer
        anchor="bottom"
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            overflow: "hidden",
          },
        }}
      >
        <div className="p-4 w-full max-w-md mx-auto">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Filters</h2>
            <IoIosCloseCircle
              className="text-2xl cursor-pointer"
              onClick={() => setFilterOpen(false)}
            />
          </div>
          {FilterData.map((data) => (
            <Accordion key={data.title}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${data.title}-content`}
                id={`${data.title}-header`}
              >
                <Typography component="span">{data.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {data.type === "radio" ? (
                  <RadioGroup
                    value={filterOptions[data.title]?.[0] || ""}
                    onChange={(e) =>
                      handleRadioChange(data.title, e.target.value)
                    }
                  >
                    {data.Options.map((option, idx) => (
                      <FormControlLabel
                        key={idx}
                        value={option}
                        control={<Radio size="small" />}
                        label={<span className="text-sm">{option}</span>}
                      />
                    ))}
                  </RadioGroup>
                ) : (
                  <div className="flex flex-col gap-2">
                    {data.Options.map((option, idx) => (
                      <label key={idx} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="w-4 h-4"
                          checked={filterOptions[data.title]?.includes(option)}
                          onChange={() =>
                            handleCheckboxChange(data.title, option)
                          }
                        />
                        <span className="text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
          <div className="mt-2 w-full flex gap-2">
            <Button
              variant="outlined"
              className="w-full"
              color="success"
              onClick={() => setFilterOpen(false)}
            >
              Apply
            </Button>
            <Button variant="outlined" className="w-full" onClick={ClearFilter}>
              Clear Filter
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default ProductBottomBar;
