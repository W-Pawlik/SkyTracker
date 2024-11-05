import { Box } from "@mui/material";
import Ticker, { TICKER_DIRECTION_RIGHT } from "framer-motion-ticker";
import Logo3 from "../../assets/images/png/airfranceLogo.png";
import Logo2 from "../../assets/images/png/americanAirlanesLogo.png";
import Logo4 from "../../assets/images/png/britishAirwaysLogo.png";
import Logo1 from "../../assets/images/png/ryanairLogo.png";

export const AirLanesTicker = () => {
  const items = [
    { path: Logo1, desc: "RyanairLogo" },
    { path: Logo2, desc: "AmericanAirLanesLogo" },
    { path: Logo3, desc: "AirFranceLogo" },
    { path: Logo4, desc: "BritishAriwaysLogo" }
  ];

  return (
    <Ticker duration={20} direction={TICKER_DIRECTION_RIGHT}>
      {items.map((item, index) => (
        <Box
          component="img"
          src={item.path}
          alt={item.desc}
          key={index}
          sx={{
            marginTop: "38px",
            height: { xs: "3rem", sm: "3rem", md: "3rem", lg: "4rem", xl: "6.5rem" },
            width: "10rem"
          }}
        />
      ))}
    </Ticker>
  );
};
