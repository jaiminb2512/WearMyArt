import React, { useEffect, useState } from "react";
import { Button, Stepper, Step, StepLabel } from "@mui/material";
import { CloudUpload, DesignServices, CheckCircle } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import ImageUploadStep from "../Components/Editor/ImageUploadStep";
import ImageEditeStep from "../Components/Editor/ImageEditeStep";
import { useDispatch } from "react-redux";
import { setProductData } from "../Redux/tempProductSlice";

const allSteps = [
  { label: "Upload Image", icon: <CloudUpload /> },
  { label: "Customize Design", icon: <DesignServices /> },
  { label: "Review & Confirm", icon: <CheckCircle /> },
];

const OrderForm = () => {
  const location = useLocation();
  const product = location.state?.product;
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = useState(0);
  const [nextAllowed, setNextAllowed] = useState(false);

  useEffect(() => {
    if (product) {
      dispatch(setProductData(product));
    }
  }, [dispatch, product]);

  useEffect(() => {
    if (steps[activeStep]?.label === "Customize Design") {
      setNextAllowed(true);
    } else {
      setNextAllowed(false);
    }
  }, [activeStep]);

  const steps =
    product?.CustomizeOption === "Text"
      ? allSteps.filter((step) => step.label !== "Upload Image")
      : allSteps;

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="w-full p-5">
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        className="w-full max-w-3xl mx-auto p-5"
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel icon={step.icon}>
              <div
                className={`border-b-4 pb-2 ${
                  activeStep === index
                    ? "border-black"
                    : index < activeStep
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
              >
                {step.label}
              </div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className="mt-5 rounded-lg text-center flex flex-col justify-center items-center">
        {steps[activeStep]?.label === "Upload Image" && (
          <ImageUploadStep setNextAllowed={setNextAllowed} />
        )}
        {steps[activeStep]?.label === "Customize Design" && (
          <ImageEditeStep setActiveStep={setActiveStep} />
        )}
        {steps[activeStep]?.label === "Review & Confirm" && (
          <p>Review your design before confirming...</p>
        )}

        <div className="mt-4 flex justify-between w-full max-w-5xl mx-auto p-5">
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="contained"
          >
            Back
          </Button>
          <Button
            disabled={!nextAllowed}
            onClick={handleNext}
            variant="contained"
          >
            Next
          </Button>

          {activeStep === steps.length - 1 && (
            <Button variant="contained" color="success">
              Finish
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
