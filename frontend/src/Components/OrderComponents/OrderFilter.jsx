import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { AdminOrderFilterData, OrderFilterData } from "../../Data/FilterData";

const OrderFilter = ({
  setFilterOptions,
  filterOptions,
  setFilterOpen = null,
  BottomBar = false,
}) => {
  const handleInputChange = (category, value) => {
    setFilterOptions((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleDurationChange = (field, value) => {
    setFilterOptions((prev) => ({
      ...prev,
      Duration: { ...prev.Duration, [field]: value },
    }));
  };

  const clearFilters = () => {
    setFilterOptions({
      Status: [],
      OrderDate: "",
      Duration: { start: "", end: "" },
      Quantity: "",
      FinalCost: "",
      OrderID: "",
      CustomizedType: [],
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

      {OrderFilterData.concat(AdminOrderFilterData).map((data) => (
        <Accordion key={data.title} className="w-full">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              <span
                className={
                  filterOptions[data.title] &&
                  (Array.isArray(filterOptions[data.title])
                    ? filterOptions[data.title].length > 0
                    : filterOptions[data.title])
                    ? "text-green-500"
                    : "text-gray-400"
                }
              >
                ●
              </span>
              {data.title}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            {data.type === "AutoComplete" ? (
              <Autocomplete
                multiple
                options={data.Options}
                value={filterOptions[data.title] || []}
                onChange={(e, newValue) =>
                  handleInputChange(data.title, newValue)
                }
                renderInput={(params) => (
                  <TextField {...params} label={data.title} />
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
            ) : data.title === "Duration" ? (
              <div className="flex flex-col gap-3">
                <TextField
                  type="date"
                  fullWidth
                  label="Start Date"
                  InputLabelProps={{ shrink: true }}
                  value={filterOptions.Duration.start || ""}
                  onChange={(e) =>
                    handleDurationChange("start", e.target.value)
                  }
                />
                <TextField
                  type="date"
                  fullWidth
                  label="End Date"
                  InputLabelProps={{ shrink: true }}
                  value={filterOptions.Duration.end || ""}
                  onChange={(e) => handleDurationChange("end", e.target.value)}
                />
              </div>
            ) : (
              <TextField
                type={data.type}
                fullWidth
                label={data.title}
                InputLabelProps={{ shrink: true }}
                value={filterOptions[data.title] || ""}
                onChange={(e) => handleInputChange(data.title, e.target.value)}
              />
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default OrderFilter;
