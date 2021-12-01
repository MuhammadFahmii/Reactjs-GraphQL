import { useMutation } from "@apollo/client";
import { MutationDeleteFavouriteMovie } from "../graphql/Mutation";

export default function DeleteFavouriteMovie() {
  const [deleteFavouriteMovie, { data, loading, error }] = useMutation(
    MutationDeleteFavouriteMovie
  );
  return {
    deleteFavouriteMovie,
    deleteFavouriteMovieData: data?.delete_movie_app_favourite_movies_by_pk,
    deleteFavouriteMovieLoading: loading,
    deleteFavouriteMovieError: error,
  };
}
