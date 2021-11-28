import { configureStore } from "@reduxjs/toolkit";
import MovieSlices from "./MovieSlices";
import UserSlices from "./UserSlices";

export default configureStore({
  reducer: {
    userActive: UserSlices,
    movies: MovieSlices,
  },
});
