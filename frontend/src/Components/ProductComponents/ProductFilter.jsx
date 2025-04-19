import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Button,
  Slider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  ProductFilterData,
  AdminProductFilterData,
} from "../../Data/FilterData";
import { useSelector } from "react-redux";

const ProductFilter = ({
  setFilterOptions,
  filterOptions,
  setSortOrder,
  BottomBar = false,
  setFilterOpen = null,
}) => {
  const { user } = useSelector((state) => state.user);
  const isAdmin = user?.isAdmin || false;

  const handleInputChange = (category, value) => {
    setFilterOptions((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleCheckboxChange = (category, option) => {
    setFilterOptions((prevFilters) => {
      const updatedOptions = prevFilters[category]?.includes(option)
        ? prevFilters[category].filter((opt) => opt !== option)
        : [...(prevFilters[category] || []), option];

      return { ...prevFilters, [category]: updatedOptions };
    });
  };

  const handleRadioChange = (category, option) => {
    if (category === "Sort") {
      setSortOrder(option === "Low to High" ? "lowToHigh" : "highToLow");
    }
    setFilterOptions((prevFilters) => ({
      ...prevFilters,
      [category]: [option],
    }));
  };

  const clearFilters = () => {
    setFilterOptions({
      Size: [],
      Sleeve: [],
      CustomizeOption: [],
      Color: [],
      Price: [0, 2000],
      Sort: ["Low to High"],
      Avalibility: ["All"],
    });
  };

  return (
    <div className="p-1 w-full">
      <div className="flex justify-between items-center mb-4">
        {!BottomBar && <Typography variant="h6">Filters</Typography>}
        {!BottomBar && (
          <Button onClick={clearFilters} color="primary">
            Clear
          </Button>
        )}
      </div>
      {BottomBar && (
        <div className="flex justify-end">
          <Button onClick={() => setFilterOpen(false)}>
            <HighlightOffIcon />
          </Button>
        </div>
      )}

      {ProductFilterData.map((data) => {
        const isActive = filterOptions[data.title]?.length > 0;
        return (
          <Accordion key={data.title} className="w-full">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                <span className={isActive ? "text-green-500" : "text-gray-400"}>
                  ●
                </span>{" "}
                {data.title}
              </Typography>
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
                      label={option}
                    />
                  ))}
                </RadioGroup>
              ) : data.type === "range slider" ? (
                <div className="flex flex-col gap-3 px-2">
                  <Slider
                    value={
                      filterOptions.Price || [data?.min || 0, data?.max || 2000]
                    }
                    onChange={(e, newValue) => {
                      if (newValue[1] - newValue[0] >= 100) {
                        handleInputChange("Price", newValue);
                      }
                    }}
                    onChangeCommitted={(e, newValue) => {
                      if (newValue[1] - newValue[0] < 100) {
                        handleInputChange("Price", [
                          newValue[0],
                          newValue[0] + 100,
                        ]);
                      }
                    }}
                    valueLabelDisplay="auto"
                    min={data?.min || 0}
                    max={data?.max || 2000}
                    step={data?.step || 100}
                    disableSwap
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{filterOptions.Price?.[0] || data?.min || 0}</span>
                    <span>{filterOptions.Price?.[1] || data?.max || 2000}</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  {data.Options.map((option, idx) => (
                    <FormControlLabel
                      key={idx}
                      control={
                        <Checkbox
                          checked={filterOptions[data.title]?.includes(option)}
                          onChange={() =>
                            handleCheckboxChange(data.title, option)
                          }
                        />
                      }
                      label={option}
                    />
                  ))}
                </div>
              )}
            </AccordionDetails>
          </Accordion>
        );
      })}

      {isAdmin &&
        AdminProductFilterData.map((data) => {
          const isActive = filterOptions[data.title]?.length > 0;
          return (
            <Accordion key={data.title} className="w-full">
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  <span
                    className={isActive ? "text-green-500" : "text-gray-400"}
                  >
                    ●
                  </span>{" "}
                  {data.title}
                </Typography>
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
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                ) : (
                  <div className="flex flex-col gap-1">
                    {data.Options.map((option, idx) => (
                      <FormControlLabel
                        key={idx}
                        control={
                          <Checkbox
                            checked={filterOptions[data.title]?.includes(
                              option
                            )}
                            onChange={() =>
                              handleCheckboxChange(data.title, option)
                            }
                          />
                        }
                        label={option}
                      />
                    ))}
                  </div>
                )}
              </AccordionDetails>
            </Accordion>
          );
        })}

      {BottomBar && (
        <div className="mt-2 w-full flex gap-2">
          <Button variant="outlined" className="w-full" color="success">
            Apply
          </Button>
          <Button variant="outlined" className="w-full" onClick={clearFilters}>
            Clear Filter
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductFilter;
