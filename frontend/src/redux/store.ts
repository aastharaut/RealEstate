import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/UserSlice";
import favouritesReducer from "./slice/favouriteSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    favourites: favouritesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
