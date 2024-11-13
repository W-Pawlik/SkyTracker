import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { Button, Typography } from "@mui/material";
import { Box, Theme, useTheme } from "@mui/system";
import { airplaneDetailsTexts } from "../../consts/texts/airplaneDetails";
import { Airplane } from "../../types/Airplane";
import { getFlagByCountryName } from "../../utils/getFlagByCountryName";

interface IAirplaneDetails {
  setIsAirplanesDetailsOpened: (bool: boolean) => void;
  selectedAirplane: Airplane | null;
}

const AirplaneDetailsCss = {
  container: () =>
    css({
      width: "34.25rem",
      position: "relative"
    }),
  flag: () =>
    css({
      width: "100%",
      height: "10rem",
      borderTopLeftRadius: "20px"
    }),
  contectContainer: () =>
    css({
      padding: "1rem 1.5rem"
    }),
  button: () =>
    css({
      position: "absolute",
      top: "0",
      right: "0",
      fontSize: "1.5rem"
    })
};

export const AirplaneDetails = ({
  setIsAirplanesDetailsOpened,
  selectedAirplane
}: IAirplaneDetails) => {
  const theme: Theme = useTheme();
  const [flag, setFlag] = useState<string | null>(null);

  const hanleClick = () => {
    setIsAirplanesDetailsOpened(false);
  };

  const country = selectedAirplane ? selectedAirplane.origin_country : "Poland";

  useEffect(() => {
    const fetchFlag = async () => {
      const countryFlag = await getFlagByCountryName(country);
      setFlag(countryFlag);
    };
    fetchFlag();
  }, [country]);

  return (
    <>
      {flag && (
        <>
          <Box
            component="img"
            src={flag}
            alt={selectedAirplane?.origin_country}
            css={AirplaneDetailsCss.flag}
          />
          <Button variant="text" onClick={hanleClick} css={AirplaneDetailsCss.button}>
            X
          </Button>
        </>
      )}
      <Box css={AirplaneDetailsCss.contectContainer}>
        <Typography>{airplaneDetailsTexts.title}</Typography>
        <Typography>
          {airplaneDetailsTexts.lastContact}
          {selectedAirplane?.last_contact}
        </Typography>
        <Typography>
          {airplaneDetailsTexts.longitude}
          {selectedAirplane?.longitude}
        </Typography>
        <Typography>
          {airplaneDetailsTexts.latitude}
          {selectedAirplane?.latitude}
        </Typography>
      </Box>
    </>
  );
};
