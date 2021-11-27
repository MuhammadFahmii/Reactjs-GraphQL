import { useLazyQuery } from "@apollo/client";
import { QueryGetCommentById } from "../graphql/Query";

export default function GetCommentById() {
  const [getCommentById, { data, loading, error }] =
    useLazyQuery(QueryGetCommentById);
  return {
    getCommentById,
    getCommentByIdData: data?.movie_app_comments_by_pk.comment,
    getCommentByIdLoading: loading,
    getCommentByIdError: error,
  };
}
