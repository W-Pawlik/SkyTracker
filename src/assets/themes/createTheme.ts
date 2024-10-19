import { buttonClasses, createTheme as createMuiTheme, Theme as MuiTheme } from "@mui/material";
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
        fontSize: "2.2rem",
        fontWeight: "700",
        [breakpoints.down("md")]: {
          fontSize: "1.63rem"
        }
      },
      h2: {
        fontSize: "1.5rem",
        fontWeight: "bold",
        lineHeight: 1.6
      },
      h3: {
        fontSize: "1.25rem",
        fontWeight: "bold",
        lineHeight: 1.5
      },
      h4: {
        fontSize: "1rem",
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
        fontSize: "1.25rem",
        fontWeight: 400,
        lineHeight: 1.43
      },
      body2: {
        fontSize: "1rem",
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
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontWeight: "600",
            fontSize: "1rem",
            textTransform: "none",
            borderRadius: "10px",

            [`&.${buttonClasses.sizeLarge}`]: {
              width: "11.6rem"
            },

            [`&.${buttonClasses.contained}`]: {
              boxShadow: "none",
              color: palette.common.white,

              "&:hover": {},
              "&:focus": {
                boxShadow: `0 0 4px 1px ${palette.info.main}`,
                borderWidth: 1,
                borderColor: "transparent"
              },
              [`&.${buttonClasses.disabled}`]: {
                color: palette.common.white,
                borderColor: "transparent"
              },
              [`&.${buttonClasses.colorSecondary}`]: {
                color: palette.primary.main,

                borderColor: "transparent",
                "&:hover": {},
                "&:focus": {
                  boxShadow: `0 0 4px 1px ${palette.info.main}`,
                  borderWidth: 1,
                  borderColor: "transparent"
                }
              }
            },
            [`&.${buttonClasses.outlined}`]: {
              border: "none",
              color: palette.primary.main,
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "rgba(0, 179, 137, 0.4)"
              },

              "&:focus": {
                boxShadow: `0 0 4px 1px ${palette.info.main}`
              },
              [`&.${buttonClasses.disabled}`]: {
                // color: palette.grey[500],
                // borderColor: palette.grey[500]
              }
            }
          }
        }
      }
    }
  });
};
