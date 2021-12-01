import { useQuery } from "@apollo/client";
import { QueryGetComments } from "../graphql/Query";

export default function GetAllComments(id_movie) {
  const { data, loading, error } = useQuery(QueryGetComments, {
    variables: {
      id_movie,
    },
  });
  return {
    allComments: data?.movie_app_comments,
    loadingAllComments: loading,
    errorAllComments: error,
  };
}
