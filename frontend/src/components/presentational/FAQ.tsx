import { useState } from "react";
import { css } from "@emotion/react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { Box, Theme, useTheme } from "@mui/system";

interface FAQData {
  question: string;
  answer: string;
}

interface FAQProps {
  faqData: FAQData[];
}

const FAQCss = {
  box: (theme: Theme) =>
    css({
      height: "100%",
      maxWidth: "80%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "start",
      color: theme.palette.common.white
    }),
  accrodion: (theme: Theme) =>
    css({
      color: theme.palette.common.white,
      borderBottom: "1px solid white",
      margin: "0 !important",
      backgroundColor: theme.palette.background.paper,
      "&:last-child": {
        borderBottom: "none",
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px"
      },
      "&:first-of-type": {
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px"
      }
    }),
  panelNumber: (theme: Theme) =>
    css({
      color: theme.palette.primary.main,
      marginRight: "1rem"
    })
};

export const FAQ = ({ faqData }: FAQProps) => {
  const theme: Theme = useTheme();
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box css={FAQCss.box(theme)}>
      {faqData.map((faqData, i) => {
        const panelNumber = (i + 1).toString().padStart(2, "0");
        return (
          <Accordion
            key={i}
            expanded={expanded === `panel${i + 1}`}
            onChange={handleChange(`panel${i + 1}`)}
            css={FAQCss.accrodion(theme)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color="secondary" />}
              aria-controls={`panel${i + 1}bh-content`}
              id={`panel${i + 1}bh-header`}
            >
              <Typography css={FAQCss.panelNumber(theme)}>{panelNumber}</Typography>
              <Typography>{faqData.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faqData.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};
