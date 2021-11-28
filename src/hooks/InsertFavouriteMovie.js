import { useMutation } from "@apollo/client";
import { MutationInsertFavouriteMovie } from "../graphql/Mutation";

export default function InsertFavouriteMovie() {
  const [insertFavouriteMovie, { data, loading, error }] = useMutation(
    MutationInsertFavouriteMovie
  );
  return {
    insertFavouriteMovie,
    insertFavouriteMovieData: data?.insert_movie_app_favourite_movies_one,
    insertFavouriteMovieLoading: loading,
    insertFavouriteMovieError: error,
  };
}
