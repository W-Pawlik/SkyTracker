import { CommonColors, TypeBackground } from "@mui/material/styles/createPalette";

export interface GeneralPaletteOptions {
  primary: SimplePaletteColorOptions;
  secondary: SimplePaletteColorOptions;
  error: SimplePaletteColorOptions;
  warning: SimplePaletteColorOptions;
  info: SimplePaletteColorOptions;
  success: SimplePaletteColorOptions;
  common: CommonColors;
  text: PortalTypeText;
  background: TypeBackground;
}
interface SimplePaletteColorOptions {
  main: string;
}

interface PortalTypeText {
  primary: string;
}
