import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addFavoriteAirplane,
  getFavoritesFromFirestore,
  removeFavoriteAirplane
} from "../../services/fireBase/firestore/users";
import { Airplane } from "../../types/Airplane";

interface UserState {
  favAirplanes: Airplane[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  favAirplanes: [],
  loading: false,
  error: null
};

export const fetchFavAirplanes = createAsyncThunk(
  "user/fetchFavAirplanes",
  async (uid: string) => await getFavoritesFromFirestore(uid)
);

export const addFavAirplane = createAsyncThunk(
  "user/addFavAirplane",
  async ({ uid, airplane }: { uid: string; airplane: Airplane }) => {
    await addFavoriteAirplane(uid, airplane);
    return airplane;
  }
);

export const removeFavAirplane = createAsyncThunk(
  "user/removeFavAirplane",
  async ({ uid, icao }: { uid: string; icao: string }) => {
    await removeFavoriteAirplane(uid, icao);
    return icao;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFavAirplanes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFavAirplanes.fulfilled, (state, action: PayloadAction<Airplane[]>) => {
      state.favAirplanes = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchFavAirplanes.rejected, (state, action) => {
      state.error = action.error.message || "Failed to fetch favorite airplanes.";
      state.loading = false;
    });

    builder.addCase(addFavAirplane.fulfilled, (state, action: PayloadAction<Airplane>) => {
      state.favAirplanes.push(action.payload);
    });

    builder.addCase(removeFavAirplane.fulfilled, (state, action: PayloadAction<string>) => {
      state.favAirplanes = state.favAirplanes.filter(
        (airplane) => airplane.icao24 !== action.payload
      );
    });
  }
});

export default userSlice.reducer;
