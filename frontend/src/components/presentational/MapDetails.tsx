import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import HeightIcon from "@mui/icons-material/Height";
import SpeedIcon from "@mui/icons-material/Speed";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import ErrorImg from "../../assets/images/png/errorAirplane.png";
import { mapDetailsTexts } from "../../consts/texts/mapDetails";
import { useAppSelector } from "../../hooks/useAppSelector";
import {
  selectAirplanes,
  selectAirplanesError,
  selectAirplanesLoading
} from "../../redux/selectors/airplanesSelectors";
import { Airplane } from "../../types/Airplane";
import { calcAvgProperty } from "../../utils/calcAvgProp";
import { getFlagByCountryName } from "../../utils/getFlagByCountryName";
import { MainLoader } from "./loaders/MainLoader";

const MapDetailsCss = {
  container: () =>
    css({
      padding: "1rem 1.5rem"
    }),
  calculationsCont: () =>
    css({
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
      marginBottom: "0.5rem"
    }),
  calculationCont: () =>
    css({
      display: "flex",
      gap: "1rem"
    }),
  flagsCont: () =>
    css({
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      justifyContent: "center",
      alignItems: "center"
    }),
  flags: () =>
    css({
      display: "flex",
      flexDirection: "row",
      gap: "1rem",
      flexWrap: "wrap"
    })
};

async function getFlagsForAllAirplanes(
  airplanes: Airplane[]
): Promise<{ flagUrl: string; alt: string }[]> {
  const seenCountries = new Set<string>();

  const flagUrls = await Promise.all(
    airplanes.map(async (airplane) => {
      const countryName = airplane.origin_country;
      if (seenCountries.has(countryName)) {
        return null;
      }
      seenCountries.add(countryName);

      const flagUrl = await getFlagByCountryName(countryName);
      return flagUrl ? { flagUrl, alt: countryName } : null;
    })
  );

  return flagUrls.filter((flag): flag is { flagUrl: string; alt: string } => flag !== null);
}

export const MapDetails = () => {
  const airplanes = useAppSelector(selectAirplanes);
  const loading = useAppSelector(selectAirplanesLoading);
  const error = useAppSelector(selectAirplanesError);

  const avgVel = calcAvgProperty(airplanes, "velocity", true);
  const avgBaroAltitude = calcAvgProperty(airplanes, "baro_altitude");

  const [flags, setFlags] = useState<{ flagUrl: string; alt: string }[]>([]);
  const [isLoadingFlags, setIsLoadingFlags] = useState(false);

  useEffect(() => {
    const fetchFlags = async () => {
      setFlags([]);
      setIsLoadingFlags(true);
      const fetchedFlags = await getFlagsForAllAirplanes(airplanes);
      setFlags(fetchedFlags);
      setIsLoadingFlags(false);
    };

    fetchFlags();
  }, [airplanes]);

  return (
    <Box css={MapDetailsCss.container}>
      <Typography variant="h1" sx={{ textAlign: "center", marginBottom: "1.5rem" }}>
        {mapDetailsTexts.title}
      </Typography>
      {loading ? (
        <MainLoader loaderSize="6rem" loaderMarginTop="8rem" />
      ) : error ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem"
          }}
        >
          <Typography>Couldn't find any aripalne in search area 🔎</Typography>
          <Box component="img" src={ErrorImg} alt="Error Image" sx={{ width: "100%" }} />
        </Box>
      ) : (
        <Box css={MapDetailsCss.calculationsCont}>
          <Box css={MapDetailsCss.calculationCont}>
            <ConnectingAirportsIcon />
            <Typography>
              {mapDetailsTexts.totalVisableAirplanes} {airplanes.length}
            </Typography>
          </Box>
          <Box css={MapDetailsCss.calculationCont}>
            <SpeedIcon />
            <Typography>
              {mapDetailsTexts.avgVelocity} {avgVel} km/h
            </Typography>
          </Box>
          <Box css={MapDetailsCss.calculationCont}>
            <HeightIcon />
            <Typography>
              {mapDetailsTexts.avgBaroAlt} {avgBaroAltitude} m
            </Typography>
          </Box>
          <Box css={MapDetailsCss.flagsCont} justifyContent="center">
            <Typography>{mapDetailsTexts.countries}</Typography>
            {isLoadingFlags || flags.length === 0 ? null : (
              <Box css={MapDetailsCss.flags}>
                {flags.map((flag, index) => (
                  <Box
                    key={index}
                    component="img"
                    src={flag.flagUrl}
                    alt={flag.alt}
                    sx={{ width: "2rem" }}
                    title={flag.alt}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Box>
        // <Box sx={{ overflowY: "scroll", height: "90%" }}>
        //   {airplanes
        //     ? airplanes.map((airplane, i) => (
        //         <Typography key={i} variant="body1">
        //           {airplane.icao24 ?? null}
        //         </Typography>
        //       ))
        //     : null}
        // </Box>
      )}
    </Box>
  );
};
