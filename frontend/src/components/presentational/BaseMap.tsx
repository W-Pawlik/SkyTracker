import { useCallback, useEffect, useState } from "react";
import Box from "@mui/system/Box";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import planeIcon from "../../assets/icons/planeIcon.png";
import { useDebounce } from "../../hooks/useDebounce";
import { Airplane } from "../../types/Airplane";
import { Coordinates } from "../../types/userLocation";

interface GoogleMapProps {
  apiKey: string;
  mapId: string;
  defaultCenter: Coordinates;
  defaultZoom?: number;
  airplanes: any[];
  onBoundsChanged?: (bounds: google.maps.LatLngBoundsLiteral) => void;
  handleAirplaneClick?: (airplane: Airplane) => void;
}

export const BaseMap = ({
  apiKey,
  mapId,
  defaultCenter,
  defaultZoom = 9,
  airplanes,
  onBoundsChanged,
  handleAirplaneClick
}: GoogleMapProps) => {
  const [mapBounds, setMapBounds] = useState<google.maps.LatLngBoundsLiteral | null>(null);
  const debuouncedBounds = useDebounce(mapBounds, 200);

  const handleBoundsChange = useCallback((event: { detail: { bounds: any } }) => {
    const { bounds } = event.detail;
    setMapBounds(bounds);
  }, []);

  useEffect(() => {
    if (debuouncedBounds && onBoundsChanged) {
      onBoundsChanged(debuouncedBounds);
    }
  }, [debuouncedBounds, onBoundsChanged]);

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        streetViewControl={false}
        defaultZoom={defaultZoom}
        defaultCenter={defaultCenter}
        mapId={mapId}
        zoomControl
        gestureHandling={"greedy"}
        disableDefaultUI={false}
        onBoundsChanged={handleBoundsChange}
        maxZoom={12}
      >
        {airplanes?.map((plane, index) =>
          plane ? (
            <AdvancedMarker
              key={index}
              position={{ lat: plane.latitude, lng: plane.longitude }}
              clickable
              onClick={() => (handleAirplaneClick ? handleAirplaneClick(plane) : undefined)}
            >
              <Box
                component="img"
                src={planeIcon}
                width={30}
                height={30}
                sx={{ transform: `rotate(${plane.true_track}deg)`, cursor: "pointer !important" }}
              />
            </AdvancedMarker>
          ) : null
        )}
      </Map>
    </APIProvider>
  );
};
