import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { BaseMap } from "../../components/presentational/BaseMap";
import { useUserLocation } from "../../hooks/useUserLocation";

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
  const [airplanes, setAirplanes] = useState<Airplane[]>([]);
  const [loading, setLoading] = useState(false);

  // const center = { lat: 53.549_92, lng: 10.006_78 };
  const center = {
    lat: (49 + 54.83) / 2, // (lamin + lamax) / 2
    lng: (14.11 + 24.15) / 2 // (lomin + lomax) / 2
  };

  const { userLocation, error, resetLocation } = useUserLocation();

  useEffect(() => {
    setLoading(true);
    // Pobieranie danych z API
    const fetchAirplaneData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/flights-in-area/?lamin=49.00&lamax=54.83&lomin=14.11&lomax=24.15"
        );
        if (!response.ok) {
          throw new Error("Błąd sieci przy pobieraniu danych o samolotach");
        }
        const data = await response.json();
        setAirplanes(data.states ?? []); // Ustawiamy dane lotów
      } catch (error) {
        console.error("Błąd przy pobieraniu danych o samolotach:", error);
      } finally {
        setLoading(false);
      }
    };

    // Aktualizacja danych co 3 sekundy
    fetchAirplaneData();
    // console.log(airplanes);

    // const interval = setInterval(fetchAirplaneData, 3000);

    // return () => clearInterval(interval); // Czyszczenie interwału przy unmount
  }, []);

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
