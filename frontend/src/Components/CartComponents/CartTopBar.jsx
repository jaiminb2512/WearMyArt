import React from "react";
import { Stepper, Step, StepLabel } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";

const steps = [
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

const CustomStepper = ({ activeStep }) => {
  return (
    <Stepper activeStep={activeStep} alternativeLabel className="w-full my-2">
      {steps.map((step, index) => (
        <Step key={index} completed={index < activeStep}>
          <StepLabel
            StepIconComponent={(props) => (
              <CustomStepIcon {...props} icon={step.icon} />
            )}
            sx={{
              "& .MuiStepLabel-label": {
                color: index < activeStep ? "green" : "inherit",
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

export default function App({ activeStep }) {
  return <CustomStepper activeStep={activeStep} />; // Change step number here
}
