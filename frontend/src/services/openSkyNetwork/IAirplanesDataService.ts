import { Airplane } from "../../types/Airplane";
import { FetchDataParams } from "../../types/fetchDataParams";

export interface IAirplaneDataService {
  fetchAirplanesData: (params: FetchDataParams) => Promise<Airplane[]>;
}