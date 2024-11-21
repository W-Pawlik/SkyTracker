import { Airplane } from "../../types/Airplane";
import { FetchDataParams } from "../../types/fetchDataParams";
import { IAirplaneDataService } from "../openSkyNetwork/IAirplanesDataService";
import { ApiUrls } from "../urls/apiUrl";

export const AirplaneDataService: IAirplaneDataService = {
  fetchAirplanesData: async (params: FetchDataParams): Promise<Airplane[]> => {
    const url = ApiUrls.flightsInArea.getAll(
      params.lamin,
      params.lamax,
      params.lomin,
      params.lomax
    );
    return await fetchData(url);
  },
  fetchAirplaneById: async (airplaneId: string, signal?: AbortSignal): Promise<Airplane> =>
    await fetchData(ApiUrls.flightById.getAllData(airplaneId), signal)
};

async function fetchData<TOutput>(url: string, signal?: AbortSignal): Promise<TOutput> {
  try {
    const response = await fetch(url, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      signal
    });
    if (!response.ok) {
      throw new Error("Failed to fetch airplane data");
    }
    const data = await response.json();

    return data.states ? (data.states as TOutput) : (data as TOutput);
  } catch (error) {
    throw new Error(`Error retrieving data from the server: ${error}`);
  }
}
