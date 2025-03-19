import React from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { FAQsData } from "../Data/Content";

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  "&.Mui-expanded": {
    "& .MuiAccordionSummary-root": {
      backgroundColor: "#C5F1E1",
    },
  },
}));

const FAQ = () => {
  return (
    <div className="flex flex-col md:flex-row p-6 md:p-12 mx-[10vw] min-h-[fit-content] py-16 gap-[50px]">
      <div className="md:w-1/3 space-y-4 flex flex-col justify-center items-center md:items-start">
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
        {FAQsData.map((faq) => (
          <StyledAccordion key={faq.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {faq.question}
            </AccordionSummary>
            <AccordionDetails className="text-gray-700 bg-white">
              {faq.answer}
            </AccordionDetails>
          </StyledAccordion>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
