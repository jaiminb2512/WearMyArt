import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { AdminOrderFilterData, OrderFilterData } from "../../Data/FilterData";

const OrderFilter = ({
  setFilterOptions,
  filterOptions,
  setFilterOpen = null,
}) => {
  const handleInputChange = (category, value) => {
    if (category === "Duration") {
      const [start, end] = value.split(",");
      setFilterOptions((prevFilters) => ({
        ...prevFilters,
        Duration: { start, end },
      }));
    } else {
      setFilterOptions((prevFilters) => ({
        ...prevFilters,
        [category]: value,
      }));
    }
  };

  const handleCheckboxChange = (category, option) => {
    setFilterOptions((prevFilters) => {
      const updatedOptions = prevFilters[category].includes(option)
        ? prevFilters[category].filter((opt) => opt !== option)
        : [...prevFilters[category], option];
      return { ...prevFilters, [category]: updatedOptions };
    });
  };

  const clearFilters = () => {
    setFilterOptions({
      Status: [],
      OrderDate: "",
      Duration: { start: "", end: "" },
      Quantity: "",
      FinalCost: "",
    });
  };

  return (
    <div className="p-1 w-full">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h6">Filters</Typography>
        <Button onClick={clearFilters} color="primary">
          Clear
        </Button>
      </div>

      {/* Existing Filters */}
      {OrderFilterData.map((data) => (
        <Accordion key={data.title} className="w-full">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              <span
                className={
                  filterOptions[data.title] ? "text-green-500" : "text-gray-400"
                }
              >
                ●
              </span>{" "}
              {data.title}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            {/* ✅ Status - MUI Autocomplete */}
            {data.type === "AutoComplete" ? (
              <Autocomplete
                multiple
                options={data.Options}
                value={filterOptions[data.title] || []}
                onChange={(e, newValue) =>
                  handleInputChange(data.title, newValue)
                }
                renderInput={(params) => (
                  <TextField {...params} label="Status" />
                )}
              />
            ) : data.type === "radio" ? (
              <RadioGroup
                value={filterOptions[data.title] || ""}
                onChange={(e) => handleInputChange(data.title, e.target.value)}
              >
                {data.Options.map((option, idx) => (
                  <FormControlLabel
                    key={idx}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            ) : null}
          </AccordionDetails>
        </Accordion>
      ))}

      {/* New Filters */}
      {AdminOrderFilterData.map((data) => (
        <Accordion key={data.title} className="w-full">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              <span
                className={
                  filterOptions[data.title] ? "text-green-500" : "text-gray-400"
                }
              >
                ●
              </span>{" "}
              {data.title}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            {data.type === "date" ? (
              <TextField
                type="date"
                fullWidth
                value={filterOptions[data.title] || ""}
                onChange={(e) => handleInputChange(data.title, e.target.value)}
              />
            ) : data.type === "input" ? (
              <TextField
                type="number"
                fullWidth
                placeholder="Enter Quantity"
                value={filterOptions[data.title] || ""}
                onChange={(e) => handleInputChange(data.title, e.target.value)}
              />
            ) : null}
          </AccordionDetails>
        </Accordion>
      ))}

      <div className="mt-2 w-full flex gap-2">
        <Button variant="outlined" className="w-full" color="success">
          Apply
        </Button>
        <Button variant="outlined" className="w-full" onClick={clearFilters}>
          Clear Filter
        </Button>
      </div>
    </div>
  );
};

export default OrderFilter;
