export const fetchAirplanesDataInArea = async (params: {
  lamin: number;
  lamax: number;
  lomin: number;
  lomax: number;
}) => {
  try {
    const url = new URL("http://127.0.0.1:8000/api/flights-in-area/");
    url.search = new URLSearchParams(params as unknown as Record<string, string>).toString();

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error("Network error");
    }
    const data = await response.json();
    return data;
  } catch {
    throw new Error("Error fetching Airplanes data from OpenSky");
  }
};
