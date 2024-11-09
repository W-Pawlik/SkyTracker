import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { BaseMap } from "../../components/presentational/BaseMap";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useUserLocation } from "../../hooks/useUserLocation";
import {
  selectAirplanes,
  selectAirplanesError,
  selectAirplanesLoading
} from "../../redux/selectors/airplanesSelectors";
import { fetchData } from "../../redux/slices/airplanesSlice";

interface Airplane {
  icao24: string;
  callsign: string;
  origin_country: string;
  time_position: number | null;
  last_contact: number | null;
  longitude: number | null;
  latitude: number | null;
  baro_altitude: number | null;
  on_ground: boolean;
  velocity: number | null;
  true_track: number | null;
  vertical_rate: number | null;
  sensors: number[] | null;
  geo_altitude: number | null;
  squawk: string | null;
  spi: boolean;
  position_source: number;
}

export const MapView = () => {
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const mapId = import.meta.env.VITE_PUBLIC_MAP_ID;
  const [isCentred, setIsCentred] = useState(false);

  const dispatch = useAppDispatch();
  const airplanes = useAppSelector(selectAirplanes);
  const loading = useAppSelector(selectAirplanesLoading);
  const error = useAppSelector(selectAirplanesError);

  // const center = { lat: 53.549_92, lng: 10.006_78 };
  const center = {
    lat: (49 + 54.83) / 2,
    lng: (14.11 + 24.15) / 2
  };

  const { userLocation, resetLocation } = useUserLocation();

  // useEffect(() => {
  //   const loc = {
  //     lamin: 49,
  //     lamax: 54,
  //     lomin: 14,
  //     lomax: 24.15
  //   };
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const data = await fetchAirplanesDataInArea(loc);
  //       setAirplanes(data.states);
  //     } catch (error) {
  //       console.error("Error", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   // const interval = setInterval(fetchData, 3000)

  //   // return () =>

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   setLoading(true);
  //   const fetchAirplaneData = async () => {
  //     try {
  //       const response = await fetch(
  // eslint-disable-next-line max-len
  //         "http://127.0.0.1:8000/api/flights-in-area/?lamin=49.00&lamax=54.83&lomin=14.11&lomax=24.15"
  //       );
  //       if (!response.ok) {
  //         throw new Error("Błąd sieci przy pobieraniu danych o samolotach");
  //       }
  //       const data = await response.json();
  //       setAirplanes(data.states ?? []);
  //     } catch (error) {
  //       console.error("Błąd przy pobieraniu danych o samolotach:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchAirplaneData();
  //   // console.log(airplanes);

  //   // const interval = setInterval(fetchAirplaneData, 3000);

  //   // return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <Box
      sx={{
        height: "100%",
        alignSelf: "center",
        display: "flex"
      }}
    >
      <Box sx={{ padding: "1rem" }}>
        <Typography variant="h2">Airplane details</Typography>
        {loading ? (
          <p>laoding...</p>
        ) : (
          airplanes.map((airplane, i) => (
            <Typography key={i} variant="body1">
              {airplane.icao24}
              {airplane.true_track}
            </Typography>
          ))
        )}
      </Box>
      <BaseMap
        apiKey={googleMapsApiKey}
        mapId={mapId}
        defaultCenter={userLocation}
        airplanes={airplanes}
      />
    </Box>
  );
};
