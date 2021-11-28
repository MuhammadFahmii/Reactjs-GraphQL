import { useQuery } from "@apollo/client";
import { QueryGetFavouriteMovie } from "../graphql/Query";

export default function GetFavouriteMovie(id) {
  const { data, loading, error } = useQuery(QueryGetFavouriteMovie, {
    variables: {
      id,
    },
  });
  return {
    getFavouriteMovieData: data?.movie_app_favourite_movies,
    getFavouriteMovieLoading: loading,
    getFavouriteMovieError: error,
  };
}
