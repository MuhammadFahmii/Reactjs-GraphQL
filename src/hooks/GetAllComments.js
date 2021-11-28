import { useLazyQuery } from "@apollo/client";
import { QueryGetComments } from "../graphql/Query";

export default function GetAllComments() {
  const [getAllComments, { data, loading, error }] =
    useLazyQuery(QueryGetComments);
  return {
    getAllComments,
    allComments: data?.movie_app_comments,
    loadingAllComments: loading,
    errorAllComments: error,
  };
}
