const BaseApiUrl = "http://127.0.0.1:8000/api";

export const ApiUrls = {
  flightsInArea: {
    getAll: (lamin: number, lamax: number, lomin: number, lomax: number) =>
      `${BaseApiUrl}/flights-in-area/?lamin=${lamin}&lamax=${lamax}&lomin=${lomin}&lomax=${lomax}`
  },
  allFlights: {
    getAll: `${BaseApiUrl}/allflights/`
  }
};
