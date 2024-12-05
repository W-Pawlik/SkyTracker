import { useCallback, useEffect, useState } from "react";
import Box from "@mui/system/Box";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import favPlaneIcon from "../../assets/icons/favPlaneIcon.png";
import planeIcon from "../../assets/icons/planeIcon.png";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useDebounce } from "../../hooks/useDebounce";
import { selectFavAirplanes } from "../../redux/selectors/userSelectors";
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
  const favAirplanes = useAppSelector(selectFavAirplanes);

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
        maxZoom={14}
        minZoom={6}
      >
        <>
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              alignItems: "center",
              top: "10px",
              right: "5rem",
              backgroundColor: "rgb(255, 255, 255)",
              color: "rgb(0,0,0)",
              boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
              fontSize: "18px",
              padding: "0 17px",
              borderRadius: "10px",
              height: "40px"
            }}
          >
            -- select country ---
          </Box>
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
                  src={
                    favAirplanes.some((airplane) => airplane.icao24 === plane.icao24)
                      ? favPlaneIcon
                      : planeIcon
                  }
                  width={30}
                  height={30}
                  sx={{ transform: `rotate(${plane.true_track}deg)`, cursor: "pointer !important" }}
                />
              </AdvancedMarker>
            ) : null
          )}
        </>
      </Map>
    </APIProvider>
  );
};
