import { Airplane } from "../Airplane";

export interface AirplanesState {
  airplanes: Airplane[];
  loading: boolean;
  error: string | null;
}
