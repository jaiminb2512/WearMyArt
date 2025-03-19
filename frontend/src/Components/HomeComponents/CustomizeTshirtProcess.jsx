import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { CustomizeTshirtProcessData } from "../../Data/Content";

const CustomizeTshirtProcess = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ py: 6, px: 3, mx: "auto" }} className="sm:max-w-[70vw]">
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        How to create custom shirts
      </Typography>
      <Typography align="center" color="textSecondary" sx={{ mb: 4 }}>
        Follow these simple steps to get your perfect custom shirt.
      </Typography>

      <Timeline
        position={isSmallScreen ? "right" : "alternate"}
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {CustomizeTshirtProcessData.map((step) => (
          <TimelineItem
            key={step.id}
            position={isSmallScreen ? "right" : "alternate"}
          >
            {!isSmallScreen && (
              <TimelineOppositeContent
                sx={{ m: "auto 0" }}
                align="right"
                className="w-0 sm:w-auto"
              >
                <img
                  src={step.image}
                  alt={step.title}
                  style={{ width: "100%", height: "auto" }}
                />
              </TimelineOppositeContent>
            )}

            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot className="p-2">
                <step.icon
                  size={step.size}
                  className={`text-${step.TextColor}`}
                />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>

            <TimelineContent
              sx={{ py: "12px", px: 2 }}
              className="flex flex-col justify-center sm:w-[50%] w-full"
            >
              <Typography variant="h6" fontWeight="bold">
                {step.title}
              </Typography>
              <Typography color="textSecondary">{step.description}</Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};

export default CustomizeTshirtProcess;
