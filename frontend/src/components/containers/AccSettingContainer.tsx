import { Theme, useTheme } from "@emotion/react";
import { Box, BoxProps, Typography } from "@mui/material";

interface IAccSettingContainer extends BoxProps {
  isBorderBottom?: boolean;
  title?: string;
  children: React.ReactNode;
}

export const AccSettingContainer = ({
  title,
  children,
  isBorderBottom = true,
  ...boxProps
}: IAccSettingContainer) => {
  const theme: Theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
        borderBottom: isBorderBottom ? `1px solid ${theme.palette.common.lightGrey}` : "none",
        paddingBottom: isBorderBottom ? `1rem` : "0"
      }}
      {...boxProps}
    >
      {title && (
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          {title}
        </Typography>
      )}
      {children}
    </Box>
  );
};
