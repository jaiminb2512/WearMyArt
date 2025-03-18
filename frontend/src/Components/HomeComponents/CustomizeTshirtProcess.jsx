import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FaTshirt, FaPalette, FaBox } from "react-icons/fa";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";

const steps = [
  {
    id: 1,
    title: "Add your shirt design",
    description:
      "Upload your unique design or choose from our collection to personalize your shirt.",
    image: "../../../public/img/image 1.png",
    icon: <FaTshirt size={24} />,
  },
  {
    id: 2,
    title: "Custom artwork & review",
    description:
      "Our design team refines your artwork and prepares it for high-quality printing.",
    image: "../../../public/img/Image 2.png",
    icon: <FaPalette size={24} />,
  },
  {
    id: 3,
    title: "Enjoy your product",
    description:
      "Receive your custom-printed shirt at your doorstep with our fast delivery service.",
    image: "../../../public/img/Image 3.png",
    icon: <FaBox size={24} />,
  },
];

const CustomizeTshirtProcess = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ py: 6, px: 3, mx: "auto" }} className="sm:max-w-[80vw]">
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        How to create custom shirts
      </Typography>
      <Typography align="center" color="textSecondary" sx={{ mb: 4 }}>
        Follow these simple steps to get your perfect custom shirt.
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Timeline position={isSmallScreen ? "alternate-reverse" : "alternate"}>
          {steps.map((step) => (
            <TimelineItem
              key={step.id}
              position={isSmallScreen ? "right" : "alternate"}
            >
              {!isSmallScreen && (
                <TimelineOppositeContent sx={{ m: "auto 0" }} align="right">
                  <img
                    src={step.image}
                    alt={step.title}
                    style={{ width: "100%", height: "auto" }}
                  />
                </TimelineOppositeContent>
              )}

              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot>{step.icon}</TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>

              <TimelineContent
                sx={{ py: "12px", px: 2 }}
                className="flex flex-col justify-center sm:w-[50%]"
              >
                <Typography variant="h6" fontWeight="bold">
                  {step.title}
                </Typography>
                <Typography color="textSecondary">
                  {step.description}
                </Typography>
                {isSmallScreen && (
                  <img
                    src={step.image}
                    alt={step.title}
                    style={{ width: "100%", height: "auto", marginTop: "10px" }}
                  />
                )}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Box>
    </Box>
  );
};

export default CustomizeTshirtProcess;
