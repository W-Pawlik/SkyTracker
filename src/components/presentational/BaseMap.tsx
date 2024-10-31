import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { Coordinates } from "../../types/userLocation";

interface GoogleMapProps {
  apiKey: string;
  mapId: string;
  defaultCenter: Coordinates;
  zoom?: number;
}

export const BaseMap = ({ apiKey, mapId, defaultCenter, zoom = 9 }: GoogleMapProps) => (
  <APIProvider apiKey={apiKey}>
    <Map
      zoom={zoom}
      defaultCenter={defaultCenter}
      mapId={mapId}
      zoomControl
      gestureHandling={"greedy"}
      disableDefaultUI
    />
  </APIProvider>
);
