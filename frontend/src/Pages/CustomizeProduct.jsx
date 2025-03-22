import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { DesignServices, CheckCircle } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import ConfirmOrder from "../Components/CustomizeTShirt/ConfirmOrder";
import { setFinalProductImg } from "../redux/tempProductSlice";
import ImageEditStep from "../Components/CustomizeTShirt/ImageEditeStep";

const steps = [
  { label: "Customize Design", icon: <DesignServices /> },
  { label: "Review & Confirm", icon: <CheckCircle /> },
];

const CustomizeProduct = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [nextAllowed, setNextAllowed] = useState(false);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.tempProduct);

  useEffect(() => {
    if (steps[activeStep]?.label === "Customize Design") {
      setNextAllowed(true);
    } else {
      setNextAllowed(false);
    }
  }, [activeStep]);

  const handleSaveDesign = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return false;

    const ProductImg = product?.ImgURL?.[0]
      ? `${import.meta.env.VITE_BASE_URL}${product.ImgURL[0]}`
      : "http://localhost:3000/uploads/ProductImages-1740638255560-756813806.jpg";

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = 300;
    tempCanvas.height = 300;
    const ctx = tempCanvas.getContext("2d");

    const designImage = canvas.toDataURL({ format: "png", quality: 1 });

    const bgImage = new Image();
    bgImage.crossOrigin = "Anonymous";
    bgImage.src = ProductImg;

    return new Promise((resolve) => {
      bgImage.onload = () => {
        ctx.drawImage(bgImage, 0, 0, 300, 300);

        const designImg = new Image();
        designImg.src = designImage;

        designImg.onload = () => {
          ctx.drawImage(designImg, 0, 0, 300, 300);

          const finalImage = tempCanvas.toDataURL("image/png");

          dispatch(setFinalProductImg(finalImage));
          resolve(true);
        };
      };
    });
  };

  const handleNext = async () => {
    if (steps[activeStep]?.label === "Customize Design") {
      const saved = await handleSaveDesign();
      if (saved) {
        setActiveStep((prevStep) => prevStep + 1);
      }
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="w-full p-5">
      {/* <Stepper
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
      </Stepper> */}

      <div className="mt-5 rounded-lg text-center flex flex-col justify-center w-full h-full items-center px-[5vw]">
        {steps[activeStep]?.label === "Customize Design" && <ImageEditStep />}
        {steps[activeStep]?.label === "Review & Confirm" && <ConfirmOrder />}

        <div className="mt-4 flex justify-between w-full max-w-5xl mx-auto p-5">
          {activeStep > 0 && (
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="contained"
            >
              Back
            </Button>
          )}
          {activeStep < steps.length - 1 && (
            <Button
              onClick={handleNext}
              variant="contained"
              // disabled={nextAllowed}
            >
              Next
            </Button>
          )}

          {activeStep === steps.length - 1 && (
            <Button variant="contained" color="success">
              Place Order
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomizeProduct;
