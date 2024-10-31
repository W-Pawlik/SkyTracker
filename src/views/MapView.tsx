import { useState } from "react";
import { Box } from "@mui/system";
import { BaseMap } from "../components/presentational/BaseMap";
import { useUserLocation } from "../hooks/useUserLocation";

export const MapView = () => {
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const mapId = import.meta.env.VITE_PUBLIC_MAP_ID;
  const [isCentred, setIsCentred] = useState(false);

  const center = { lat: 53.549_92, lng: 10.006_78 };

  const { userLocation, error, resetLocation } = useUserLocation();

  return (
    <Box sx={{ height: "30rem", width: "50%", alignSelf: "center" }}>
      <BaseMap apiKey={googleMapsApiKey} mapId={mapId} defaultCenter={userLocation} />
    </Box>
  );
};
