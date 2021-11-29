import { configureStore } from "@reduxjs/toolkit";
import MovieSlices from "./MovieSlices";

export default configureStore({
  reducer: {
    movies: MovieSlices,
  },
});
