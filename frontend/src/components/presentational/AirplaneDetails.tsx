import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CallIcon from "@mui/icons-material/Call";
import GroundIcon from "@mui/icons-material/FlightLand";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import HeightIcon from "@mui/icons-material/Height";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PasswordIcon from "@mui/icons-material/Password";
import SpeedIcon from "@mui/icons-material/Speed";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import VerticalAlignCenterIcon from "@mui/icons-material/VerticalAlignCenter";
import { Button, Typography } from "@mui/material";
import { Box, Theme, useTheme } from "@mui/system";
import ErrorImage from "../../assets/images/png/errorAirplane.png";
import { airplaneDetailsTexts } from "../../consts/texts/airplaneDetails";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectAirplanes } from "../../redux/selectors/airplanesSelectors";
import { selectFavAirplanes } from "../../redux/selectors/userSelectors";
import { addFavAirplane, removeFavAirplane } from "../../redux/slices/userSlice";
import { auth } from "../../services/fireBase/firebaseConfig";
import { AirplaneDataService } from "../../services/openSkyNetwork/AirplanesDataService";
import { Airplane } from "../../types/Airplane";
import { getTimeSinceLastContact } from "../../utils/convertTimestamp";
import { getFlagByCountryName } from "../../utils/getFlagByCountryName";
import { CommonButton } from "./Button";

interface IAirplaneDetails {
  setIsAirplanesDetailsOpened: (bool: boolean) => void;
  selectedAirplaneId: string | null;
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
      height: "100%",
      borderTopLeftRadius: "20px"
    }),
  contentContainer: () =>
    css({
      display: "flex",
      flexDirection: "column",
      padding: "1rem 1.5rem",
      gap: "0.8rem"
    }),
  button: (theme: Theme) =>
    css({
      position: "absolute",
      top: "0",
      right: "0",
      fontSize: "1.5rem",
      "&: hover": {
        color: theme.palette.common.darkerTurquoise,
        backgroundColor: "transparent"
      }
    }),
  dataContainer: () =>
    css({
      display: "flex",
      alignItems: "center",
      justifyContent: "start",
      gap: "0.4rem"
    })
};

export const AirplaneDetails = ({
  setIsAirplanesDetailsOpened,
  selectedAirplaneId
}: IAirplaneDetails) => {
  const theme: Theme = useTheme();
  const airplanes = useAppSelector(selectAirplanes);
  const [selectedAirplane, setSelectedAirplane] = useState<Airplane | null>(null);
  const [flag, setFlag] = useState<string | null>(null);
  const favAirplanes = useAppSelector(selectFavAirplanes);
  const dispatch = useAppDispatch();

  const isFavorite =
    selectedAirplane && favAirplanes.some((fav) => fav.icao24 === selectedAirplane.icao24);
  const lastContact = getTimeSinceLastContact(selectedAirplane?.last_contact);
  const country = selectedAirplane ? selectedAirplane.origin_country : null;

  const hanleClick = () => {
    setIsAirplanesDetailsOpened(false);
  };

  const handleToggleFavorite = () => {
    if (selectedAirplane) {
      const uid = auth.currentUser?.uid;
      if (uid !== undefined) {
        if (isFavorite) {
          dispatch(removeFavAirplane({ uid, icao: selectedAirplane.icao24 }));
        } else {
          dispatch(addFavAirplane({ uid, airplane: selectedAirplane }));
        }
      }
    }
  };

  useEffect(() => {
    const airplaneFromState = airplanes.find((plane) => plane.icao24 === selectedAirplaneId);
    if (airplaneFromState) {
      setSelectedAirplane(airplaneFromState);
    }
  }, [airplanes, selectedAirplaneId]);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const fetchAirplaneData = async () => {
      if (selectedAirplaneId) {
        try {
          const data = await AirplaneDataService.fetchAirplaneById(selectedAirplaneId, signal);
          setSelectedAirplane(data);
        } catch (error: any) {
          if (error.name !== "AbortError") {
            console.warn("Error fetching airplane data:", error);
          }
        }
      }
    };

    fetchAirplaneData();

    const interval = setInterval(() => {
      fetchAirplaneData();
    }, 3000);

    return () => {
      clearInterval(interval);
      abortController.abort();
    };
  }, [selectedAirplaneId]);

  useEffect(() => {
    const fetchFlag = async () => {
      const countryFlag = await getFlagByCountryName(country);
      setFlag(countryFlag);
    };
    if (country) {
      fetchFlag();
    }
  }, [country]);

  return (
    <>
      {flag && (
        <Box sx={{ height: "10rem" }}>
          <Box
            component="img"
            src={flag}
            alt={selectedAirplane?.origin_country}
            css={AirplaneDetailsCss.flag}
            title={selectedAirplane?.origin_country}
          />
          <Button variant="text" onClick={hanleClick} css={AirplaneDetailsCss.button(theme)}>
            X
          </Button>
        </Box>
      )}
      <Box css={AirplaneDetailsCss.contentContainer}>
        <Typography variant="h1" textAlign="center" marginBottom="0.5rem">
          {airplaneDetailsTexts.title}
        </Typography>
        <CommonButton
          text={isFavorite ? "Delete from favorites" : "Add to favorites"}
          onClick={handleToggleFavorite}
        />
        {selectedAirplane ? (
          <>
            <Box css={AirplaneDetailsCss.dataContainer}>
              <PasswordIcon />
              <Typography>
                {airplaneDetailsTexts.icao24}
                {selectedAirplane?.icao24}
              </Typography>
            </Box>

            <Box css={AirplaneDetailsCss.dataContainer}>
              <CallIcon />
              <Typography>
                {airplaneDetailsTexts.callsign}
                {selectedAirplane?.callsign || "N/A"}
              </Typography>
            </Box>

            <Box css={AirplaneDetailsCss.dataContainer}>
              <AccessTimeIcon />
              <Typography>
                {airplaneDetailsTexts.lastContact}
                {lastContact}
              </Typography>
            </Box>

            <Box css={AirplaneDetailsCss.dataContainer}>
              <LocationOnIcon />
              <Typography>
                {airplaneDetailsTexts.longitude}
                {selectedAirplane?.longitude}
              </Typography>
            </Box>

            <Box css={AirplaneDetailsCss.dataContainer}>
              <LocationOnIcon />
              <Typography>
                {airplaneDetailsTexts.latitude}
                {selectedAirplane?.latitude}
              </Typography>
            </Box>

            <Box css={AirplaneDetailsCss.dataContainer}>
              <HeightIcon />
              <Typography>
                {airplaneDetailsTexts.baroAltitude}
                {selectedAirplane?.baro_altitude} m
              </Typography>
            </Box>

            <Box css={AirplaneDetailsCss.dataContainer}>
              <GroundIcon />
              <Typography>
                {airplaneDetailsTexts.onGround}
                {selectedAirplane?.on_ground ? "Yes" : "No"}
              </Typography>
            </Box>

            <Box css={AirplaneDetailsCss.dataContainer}>
              <SpeedIcon />
              <Typography>
                {airplaneDetailsTexts.velocity}
                {selectedAirplane?.velocity && (selectedAirplane.velocity * 3.6).toFixed(0)} km/h
              </Typography>
            </Box>

            <Box css={AirplaneDetailsCss.dataContainer}>
              <FlightTakeoffIcon />
              <Typography>
                {airplaneDetailsTexts.track}
                {selectedAirplane?.true_track}&deg;
              </Typography>
            </Box>

            <Box css={AirplaneDetailsCss.dataContainer}>
              <VerticalAlignCenterIcon />
              <Typography>
                {airplaneDetailsTexts.vertical}
                {selectedAirplane?.vertical_rate} m/s;
              </Typography>
            </Box>

            <Box css={AirplaneDetailsCss.dataContainer}>
              <SquareFootIcon />
              <Typography>
                {airplaneDetailsTexts.squawk}
                {selectedAirplane?.squawk || "N/A"}
              </Typography>
            </Box>
          </>
        ) : (
          <Box component="img" src={ErrorImage} alt="Error" sx={{ width: "5rem" }} />
        )}
      </Box>
    </>
  );
};
