import { RootState } from "../store";

export const selectFavAirplanes = (state: RootState) => state.user.favAirplanes;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;
