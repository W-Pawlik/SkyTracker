export async function getFlagByCountryName(countryName: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`
    );
    const data = await response.json();

    if (!data || data.length === 0) {
      console.warn(`Flaga dla ${countryName} nie została znaleziona`);
      return null;
    }

    return data[0].flags.png;
  } catch (error: any) {
    console.error(`Błąd przy pobieraniu flagi dla ${countryName}: ${error.message}`);
    return null;
  }
}
