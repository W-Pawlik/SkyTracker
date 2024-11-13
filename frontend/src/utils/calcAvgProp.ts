import { Airplane } from "../types/Airplane";

export function calcAvgProperty(
  airplanes: Airplane[],
  property: "velocity" | "baro_altitude",
  convertToKmH = false
): number {
  if (!Array.isArray(airplanes) || airplanes.length === 0) {
    return 0;
  }

  const values = airplanes
    .map((airplane) => {
      const value = airplane[property];
      if (value === null) {
        return null;
      }
      return convertToKmH && property === "velocity" ? value * 3.6 : value;
    })
    .filter((value): value is number => value !== null);

  if (values.length === 0) {
    throw new Error(`Brak dostępnych wartości ${property} do obliczenia średniej.`);
  }

  const sum = values.reduce((acc, value) => acc + value, 0);
  const average = Number((sum / values.length).toFixed(0));

  return average;
}
