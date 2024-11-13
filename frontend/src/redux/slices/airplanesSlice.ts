import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { airplanesInitialState } from "../../consts/initialStates/airplanesInitialState";
import { AirplaneDataService } from "../../services/openSkyNetwork/AirplanesDataService";
import { Airplane } from "../../types/Airplane";
import { FetchDataParams } from "../../types/fetchDataParams";

export const fetchData = createAsyncThunk(
  "airplanes/fetchData",
  async (params: FetchDataParams) => await AirplaneDataService.fetchAirplanesData(params)
);

const airplanesSlice = createSlice({
  name: "airplanesSlice",
  initialState: airplanesInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<Airplane[]>) => {
        state.airplanes = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "failed to fetch current airplanes data";
      });
  }
});

export default airplanesSlice.reducer;
