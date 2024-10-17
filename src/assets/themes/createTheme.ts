import { createTheme as createMuiTheme, Theme as MuiTheme } from "@mui/material";
import { breakpoints } from "./breakpoints";
import { createStandardPalette } from "./standardPalette";

import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme extends MuiTheme {}
}

export const createTheme = (): MuiTheme => {
  const palette = createStandardPalette();

  return createMuiTheme({
    palette,
    breakpoints,
    typography: {
      fontFamily: "OpenSans, sans-serif",
      h1: {
        fontSize: "2.82rem",
        fontWeight: "700",
        [breakpoints.down("md")]: {
          fontSize: "1.63rem"
        }
      },
      h2: {
        fontSize: "1.25rem",
        fontWeight: "bold",
        lineHeight: 1.6
      },
      h3: {
        fontSize: "1rem",
        fontWeight: "bold",
        lineHeight: 1.5
      },
      h4: {
        fontSize: "0.875rem",
        fontWeight: "bold",
        lineHeight: 1.71
      },
      h5: {
        fontSize: "0.875rem",
        fontWeight: 700,
        lineHeight: 1.71
      },
      h6: {
        fontSize: "0.875rem",
        fontWeight: 700,
        lineHeight: 1.71
      },
      subtitle1: {
        fontSize: "0.875rem",
        fontWeight: 600,
        lineHeight: 1.43
      },
      subtitle2: {
        fontSize: "0.875rem",
        fontWeight: 300,
        lineHeight: 1.43
      },
      body1: {
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 1.43
      },
      body2: {
        fontSize: "0.875rem",
        fontWeight: 400,
        lineHeight: 1.71
      },
      caption: {
        fontSize: "0.75rem",
        fontWeight: 400,
        lineHeight: 1.33
      }
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            top: "-65px",
            padding: "0 1.5rem",
            justifyContent: "space-between",
            minHeight: "3.5rem",
            flexDirection: "row",
            alignItems: "center",
            border: "none",
            borderBottomStyle: "solid",
            borderBottomWidth: 1,
            borderRadius: 0
          },
          colorPrimary: {
            position: "sticky",
            backgroundColor: palette.common.backgroundLightBlue,
            boxShadow: "none"
          }
        }
      }
    }
  });
};
