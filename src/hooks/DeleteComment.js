import { useMutation } from "@apollo/client";
import { MutationDeleteComment } from "../graphql/Mutation";

export default function DeleteComment() {
  const [deleteComment, { data, loading, error }] = useMutation(
    MutationDeleteComment
  );
  return {
    deleteComment,
    deleteCommentData: data?.delete_movie_app_comments_by_pk,
    deleteCommentLoading: loading,
    deleteCommentError: error,
  };
}
