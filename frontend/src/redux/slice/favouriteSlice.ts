import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export interface FavouriteProperty {
  id: number;
  title: string;
  price: number;
  address: string;
  image_url: string;
}

interface FavouritesState {
  items: FavouriteProperty[];
  loading: boolean;
  error: string | null;
}

const initialState: FavouritesState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchFavourites = createAsyncThunk(
  "favourites/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/favourites");
      return res.data.favourites.map(
        (fav: { id: number; property: FavouriteProperty }) => fav.property,
      );
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch favourites",
      );
    }
  },
);
export const addFavourite = createAsyncThunk(
  "favourites/add",
  async (
    property: FavouriteProperty, // pass full property object from PropertyCard
    { rejectWithValue },
  ) => {
    try {
      await api.post("/favourites", { propertyId: property.id });
      return property; // use the property we already have on the frontend
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add favourite",
      );
    }
  },
);

// DELETE
export const removeFavourite = createAsyncThunk(
  "favourites/remove",
  async (propertyId: number, { rejectWithValue }) => {
    try {
      await api.delete(`/favourites/${propertyId}`);
      return propertyId;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to remove favourite",
      );
    }
  },
);

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch
    builder.addCase(fetchFavourites.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchFavourites.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchFavourites.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //instantly show in UI
    builder.addCase(addFavourite.fulfilled, (state, action) => {
      if (!state.items.find((p) => p.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    });

    //instantly remove from UI
    builder.addCase(removeFavourite.fulfilled, (state, action) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
    });
  },
});

export default favouritesSlice.reducer;
