import { configureStore } from "@reduxjs/toolkit";
import MovieSlices from "../stores/MovieSlices";

export default configureStore({
  reducer: {
    movies: MovieSlices,
  },
});
