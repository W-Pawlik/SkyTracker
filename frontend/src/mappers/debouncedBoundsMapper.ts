import { Boundaries, MapBounds } from "../types/Bounds";

export const mapDebouncedBounds = (bounds: MapBounds): Boundaries => ({
  lamin: bounds.south,
  lamax: bounds.north,
  lomin: bounds.west,
  lomax: bounds.east
});
