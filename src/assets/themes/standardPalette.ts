import { GeneralPaletteOptions } from "./themeTypes";

declare module "@mui/material/styles/createPalette" {
  interface CommonColors {
    black: string;
    white: string;
    linkColor: string;
    buttonFocusBorder: string;
    turquoise: string;
    backgroundLightBlue: string;
  }
}

const standardColors = {
  turquoise: "#00B389",
  deepBlue: "#082D64",
  lighterBlue: "#0E3878",
  white: "#fff",
  black: "#000",
  lightGrey: "#c0cedc",
  lighterGrey: "#e6ebf1",
  ightestGrey: "#f5f7f9",
  backgroundLightBlue: "#475A97",
  backgroundDarkGrey: "#4e647b",
  backgroundGrey: "#96a8ba",
  // error, info, success, warning colors
  highlightsRed: "#e57474",
  highlightsGreen: "#73ae61",
  highlightsAmber: "#ed992d",
  highlightsBlue: "#5a9adf",
  highlightsCyan: "#a0e4ff"
};

export const createStandardPalette = (): GeneralPaletteOptions => {
  const primaryColor = standardColors.turquoise;
  const errorColor = standardColors.highlightsRed;
  const successColor = standardColors.highlightsGreen;
  const warningColor = standardColors.highlightsAmber;
  const infoColor = standardColors.highlightsBlue;

  return {
    primary: {
      main: primaryColor
    },
    secondary: {
      main: standardColors.deepBlue
    },
    background: {
      default: standardColors.backgroundLightBlue,
      paper: standardColors.white
    },
    text: {
      primary: standardColors.white
    },
    success: {
      main: successColor
    },
    info: {
      main: infoColor
    },
    warning: {
      main: warningColor
    },
    error: {
      main: errorColor
    },
    common: {
      black: standardColors.black,
      white: standardColors.white,
      linkColor: standardColors.turquoise,
      buttonFocusBorder: standardColors.turquoise,
      turquoise: standardColors.turquoise,
      backgroundLightBlue: standardColors.backgroundLightBlue
    }
  };
};
