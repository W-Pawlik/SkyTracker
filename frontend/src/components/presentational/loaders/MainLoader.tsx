import { Box, Theme, useTheme } from "@mui/system";

import "./MainLoader.css";

interface IMainLoader {
  loaderSize?: string;
  loaderMarginTop?: string;
}

export const MainLoader = ({ loaderSize = "2.5rem", loaderMarginTop = "0" }: IMainLoader) => {
  const theme: Theme = useTheme();

  return (
    <Box className="loader" sx={{ marginTop: loaderMarginTop }}>
      <Box component="div" className="plane">
        <Box
          component="img"
          src="https://zupimages.net/up/19/34/4820.gif"
          className="plane-img"
          sx={{ width: loaderSize }}
        />
      </Box>
    </Box>
  );
};
