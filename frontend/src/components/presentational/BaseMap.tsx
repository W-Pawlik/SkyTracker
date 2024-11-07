import Box from "@mui/system/Box";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import planeIcon from "../../assets/icons/planeIcon.png";
import { Coordinates } from "../../types/userLocation";

interface GoogleMapProps {
  apiKey: string;
  mapId: string;
  defaultCenter: Coordinates;
  defaultZoom?: number;
  airplanes: any[];
}

export const BaseMap = ({
  apiKey,
  mapId,
  defaultCenter,
  defaultZoom = 9,
  airplanes
}: GoogleMapProps) => (
  <APIProvider apiKey={apiKey}>
    <Map
      defaultZoom={defaultZoom}
      defaultCenter={defaultCenter}
      mapId={mapId}
      zoomControl
      gestureHandling={"greedy"}
      disableDefaultUI={false}
    >
      {airplanes.map((plane, index) => (
        <AdvancedMarker key={index} position={{ lat: plane.latitude, lng: plane.longitude }}>
          <Box
            component="img"
            src={planeIcon}
            width={30}
            height={30}
            sx={{ transform: `rotate(${plane.true_track}deg)` }}
          />
        </AdvancedMarker>
      ))}
    </Map>
  </APIProvider>
);
