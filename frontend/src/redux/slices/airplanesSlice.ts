import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Airplane {
  icao24: string;
  callsign: string | null;
  origin_country: string;
  longitude: number | null;
  latitude: number | null;
  velocity: number | null;
  true_track: number | null;
}

interface AirplanesState {
  airplanes: Airplane[];
  loading: boolean;
  error: string | null;
}

const initialState: AirplanesState = {
  airplanes: [],
  loading: false,
  error: null
};

const airplanesSlice = createSlice({
  name: "airplanesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<Airplane[]>) => {
        state.airplanes = action.payload;
        state.loading = false;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "failed to fetch current airplanes data";
      });
  }
});

export const fetchData = createAsyncThunk("airplanes/fetchData", async () => {
  const response = await fetch(
    "http://127.0.0.1:8000/api/flights-in-area/?lamin=49.00&lamax=54.83&lomin=14.11&lomax=24.15"
  );

  const data = await response.json();
  return data.states as Airplane[];
});

export default airplanesSlice.reducer;
