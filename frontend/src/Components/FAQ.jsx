import React from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  "&.Mui-expanded": {
    "& .MuiAccordionSummary-root": {
      backgroundColor: "#C5F1E1",
    },
  },
}));

const FAQ = () => {
  return (
    <div className="flex flex-col md:flex-row p-6 md:p-12">
      {/* Left Section */}
      <div className="md:w-1/3 space-y-4">
        <span className="bg-purple-200 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
          Support
        </span>
        <h2 className="text-2xl font-bold">Frequently asked questions</h2>
        <p className="text-gray-600">
          You've got the idea, we've got the tools—design your custom clothing
          with our free design assets.
        </p>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span className="text-gray-700 font-semibold">ANY QUESTIONS</span>
        </div>
        <p className="text-green-600 font-semibold">hello@wearmyart.com</p>
      </div>

      <div className="md:w-2/3 space-y-4">
        <StyledAccordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            className="bg-green-500 text-white"
          >
            How does product customization work?
          </AccordionSummary>
          <AccordionDetails className="text-gray-700 bg-white">
            To make a T-shirt design, you first need to install specific graphic
            design software. Once you've done that, start your creation with a
            design in at least 220 DPI so it won't be pixelated when printed. To
            design your own T-shirt, you can upload your design to the front of
            your tee and add custom elements like text. For some of our
            T-shirts, reverse side printing is also available.
          </AccordionDetails>
        </StyledAccordion>
        <StyledAccordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            What products can I customize?
          </AccordionSummary>
          <AccordionDetails>
            You can customize T-shirts, hoodies, caps, tote bags, and more.
          </AccordionDetails>
        </StyledAccordion>
        <StyledAccordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            How are your T-shirts printed?
          </AccordionSummary>
          <AccordionDetails>
            We use high-quality screen printing and direct-to-garment (DTG)
            printing methods.
          </AccordionDetails>
        </StyledAccordion>
        <StyledAccordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            What is the best T-shirt material?
          </AccordionSummary>
          <AccordionDetails>
            100% cotton and cotton blends are great choices for comfort and
            durability.
          </AccordionDetails>
        </StyledAccordion>
        <StyledAccordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Can I order a personalized gift?
          </AccordionSummary>
          <AccordionDetails>
            Yes! Our custom design options make for great personalized gifts.
          </AccordionDetails>
        </StyledAccordion>
      </div>
    </div>
  );
};

export default FAQ;
