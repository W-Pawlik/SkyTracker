import { useCallback, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { BaseMap } from "../../components/presentational/BaseMap";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useDebounce } from "../../hooks/useDebounce";
import { useUserLocation } from "../../hooks/useUserLocation";
import { mapDebouncedBounds } from "../../mappers/debouncedBoundsMapper";
import {
  selectAirplanes,
  selectAirplanesError,
  selectAirplanesLoading
} from "../../redux/selectors/airplanesSelectors";
import { fetchData } from "../../redux/slices/airplanesSlice";

export const MapView = () => {
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const mapId = import.meta.env.VITE_PUBLIC_MAP_ID;
  const [mapBounds, setMapBounds] = useState<google.maps.LatLngBoundsLiteral | null>(null);

  const dispatch = useAppDispatch();
  const airplanes = useAppSelector(selectAirplanes);
  const loading = useAppSelector(selectAirplanesLoading);
  const error = useAppSelector(selectAirplanesError);

  const { userLocation, hasInteracted } = useUserLocation();

  const debouncedBounds = useDebounce(mapBounds, 200);

  const handleBoundsChange = useCallback((bounds: google.maps.LatLngBoundsLiteral) => {
    setMapBounds(bounds);
  }, []);

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
          <Box sx={{ padding: "1rem" }}>
            <Typography variant="h2">Airplane details</Typography>
            {loading ? (
              <p>laoding...</p>
            ) : error ? (
              <Typography>Error</Typography>
            ) : (
              <Box sx={{ overflowY: "scroll", height: "90%" }}>
                {airplanes
                  ? airplanes.map((airplane, i) => (
                      <Typography key={i} variant="body1">
                        {airplane.icao24 ?? null}
                      </Typography>
                    ))
                  : null}
              </Box>
            )}
          </Box>
          <BaseMap
            apiKey={googleMapsApiKey}
            mapId={mapId}
            defaultCenter={userLocation}
            airplanes={airplanes}
            onBoundsChanged={handleBoundsChange}
          />
        </>
      ) : (
        <Typography>Waiting</Typography>
      )}
    </Box>
  );
};
