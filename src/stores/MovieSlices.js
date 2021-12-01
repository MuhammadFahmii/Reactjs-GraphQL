import { createSlice } from "@reduxjs/toolkit";

const MovieSlices = createSlice({
  name: "movie",
  initialState: {
    movies: "",
    favouriteMovie: "",
  },
  reducers: {
    resultSearchMovie: (state, action) => {
      const searchMovie = action.payload;
      state.movies = searchMovie;
    },
    myFavouriteMovie: (state, action) => {
      const favouriteMovie = action.payload;
      state.favouriteMovie = favouriteMovie;
    },
  },
});

export const { resultSearchMovie, myFavouriteMovie } = MovieSlices.actions;
export default MovieSlices.reducer;
