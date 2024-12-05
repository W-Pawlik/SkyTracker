import { useCallback, useEffect, useState } from "react";
import { Theme, useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { AirplaneDetails } from "../../components/presentational/AirplaneDetails";
import { BaseMap } from "../../components/presentational/BaseMap";
import { MapDetails } from "../../components/presentational/MapDetails";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useDebounce } from "../../hooks/useDebounce";
import { useUserLocation } from "../../hooks/useUserLocation";
import { mapDebouncedBounds } from "../../mappers/debouncedBoundsMapper";
import { selectAirplanes } from "../../redux/selectors/airplanesSelectors";
import { fetchData } from "../../redux/slices/airplanesSlice";
import { Airplane } from "../../types/Airplane";

export const MapView = () => {
  const theme: Theme = useTheme();
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const mapId = import.meta.env.VITE_PUBLIC_MAP_ID;
  const [mapBounds, setMapBounds] = useState<google.maps.LatLngBoundsLiteral | null>(null);
  const [isAirplanesDetailsOpened, setIsAirplanesDetailsOpened] = useState<boolean>(false);
  const [selectedAirplaneId, setSelectedAirplaneId] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const airplanes = useAppSelector(selectAirplanes);

  const { userLocation, hasInteracted } = useUserLocation();

  const debouncedBounds = useDebounce(mapBounds, 200);

  const handleBoundsChange = useCallback((bounds: google.maps.LatLngBoundsLiteral) => {
    setMapBounds(bounds);
  }, []);

  const handleAirplaneClick = (plane: Airplane) => {
    setIsAirplanesDetailsOpened(true);
    setSelectedAirplaneId(plane.icao24);
  };

  useEffect(() => {
    // const interval = setInterval(() => {
    //   if (debouncedBounds) {
    // const mappedBounds = mapDebouncedBounds(debouncedBounds);
    //     dispatch(fetchData(mappedBounds));
    //   }
    // }, 3000);
    // return () => {
    //   clearInterval(interval);
    // };
    if (debouncedBounds) {
      const mappedBounds = mapDebouncedBounds(debouncedBounds);
      dispatch(fetchData(mappedBounds));
    }
  }, [debouncedBounds, dispatch]);

  return (
    <Box
      sx={{
        height: "100%",
        alignSelf: "center",
        display: "flex"
      }}
    >
      {hasInteracted ? (
        <>
          <Box
            sx={{
              width: "30rem",
              position: "relative",
              overflowY: "auto",
              transition: "background-color 1s ease",

              "&::-webkit-scrollbar": {
                width: "6px"
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: theme.palette.primary.main,
                transition: "background-color 1s ease"
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: theme.palette.common.darkerTurquoise
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: theme.palette.secondary.main
              }
            }}
          >
            {isAirplanesDetailsOpened ? (
              <AirplaneDetails
                setIsAirplanesDetailsOpened={setIsAirplanesDetailsOpened}
                selectedAirplaneId={selectedAirplaneId ?? null}
              />
            ) : (
              <MapDetails />
            )}
          </Box>

          <BaseMap
            apiKey={googleMapsApiKey}
            mapId={mapId}
            defaultCenter={userLocation}
            airplanes={airplanes}
            onBoundsChanged={handleBoundsChange}
            handleAirplaneClick={handleAirplaneClick}
          />
        </>
      ) : (
        <Typography>Waiting</Typography>
      )}
    </Box>
  );
};
