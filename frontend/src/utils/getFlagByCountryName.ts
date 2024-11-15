import AllFlags from "../assets/images/png/allFlags.png";

export async function getFlagByCountryName(countryName: string | null): Promise<string | null> {
  if (!countryName) {
    return AllFlags;
  }
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`
    );
    const data = await response.json();

    if (!data || data.length === 0) {
      console.warn(`${countryName} flag not found`);
      return AllFlags;
    }

    return data[0].flags.png;
  } catch (error: any) {
    console.error(`Error ${countryName}: ${error.message}`);
    return null;
  }
}
