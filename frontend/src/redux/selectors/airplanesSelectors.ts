import { RootState } from "../store";

export const selectAirplanes = (state: RootState) => state.airplanes.airplanes;
export const selectAirplanesLoading = (state: RootState) => state.airplanes.loading;
export const selectAirplanesError = (state: RootState) => state.airplanes.error;
