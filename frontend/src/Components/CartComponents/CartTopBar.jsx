import React from "react";
import { Stepper, Step, StepLabel } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import { useSelector } from "react-redux";

const allSteps = [
  { label: "Shopping Cart", icon: <ShoppingCartIcon /> },
  { label: "Checkout", icon: <CreditCardIcon /> },
  { label: "Order Complete", icon: <AssuredWorkloadIcon /> },
];

const CustomStepIcon = ({ active, completed, icon }) => {
  return completed ? (
    <CheckCircleIcon style={{ color: "green" }} />
  ) : (
    React.cloneElement(icon, { style: { color: active ? "green" : "gray" } })
  );
};

const CartTopBar = () => {
  const { activeStep, buyNow } = useSelector((state) => state.BuyProduct);

  const stepsToShow = buyNow ? allSteps.slice(1) : allSteps;
  const displayedStep = buyNow ? activeStep - 1 : activeStep;

  return (
    <Stepper
      activeStep={displayedStep}
      alternativeLabel
      className="w-full my-2"
    >
      {stepsToShow.map((step, index) => (
        <Step key={index} completed={index < displayedStep}>
          <StepLabel
            StepIconComponent={(props) => (
              <CustomStepIcon {...props} icon={step.icon} />
            )}
            sx={{
              "& .MuiStepLabel-label": {
                color: index < displayedStep ? "green" : "inherit",
              },
            }}
          >
            <span className="hidden sm:block">{step.label}</span>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CartTopBar;
