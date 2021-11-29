import { useMutation } from "@apollo/client";
import { MutationInsertFavouriteMovie } from "../graphql/Mutation";
import { QueryGetFavouriteMovie } from "../graphql/Query";

export default function InsertFavouriteMovie(id_movie) {
  const [insertFavouriteMovie, { data, loading, error }] = useMutation(
    MutationInsertFavouriteMovie,
    {
      refetchQueries: [
        {
          query: QueryGetFavouriteMovie,
          variables: {
            id: id_movie,
          },
        },
      ],
    }
  );
  return {
    insertFavouriteMovie,
    insertFavouriteMovieData: data?.insert_movie_app_favourite_movies_one,
    insertFavouriteMovieLoading: loading,
    insertFavouriteMovieError: error,
  };
}
