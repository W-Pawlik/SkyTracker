/* eslint-disable max-len */
import { Airplane } from "../../types/Airplane";
import { FetchDataParams } from "../../types/fetchDataParams";

export const fetchAirplanesData = async ({
  lamin,
  lamax,
  lomin,
  lomax
}: FetchDataParams): Promise<Airplane[]> => {
  const response = await fetch(
    `http://127.0.0.1:8000/api/flights-in-area/?lamin=${lamin}&lamax=${lamax}&lomin=${lomin}&lomax=${lomax}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch airplane data");
  }

  const data = await response.json();
  return data.states as Airplane[];
};
