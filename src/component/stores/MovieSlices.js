import { createSlice } from "@reduxjs/toolkit";

const MovieSlices = createSlice({
  name: "movie",
  initialState: {
    movies: "",
  },
  reducers: {
    resultSearchMovie: (state, action) => {
      const searchMovie = action.payload;
      state.movies = searchMovie;
    },
  },
});

export const { resultSearchMovie } = MovieSlices.actions;
export default MovieSlices.reducer;
