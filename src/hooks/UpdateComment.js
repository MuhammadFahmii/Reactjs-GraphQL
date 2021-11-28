import { useMutation } from "@apollo/client";
import { MutationUpdateComment } from "../graphql/Mutation";

export default function UpdateComment() {
  const [updateComment, { data, loading, error }] = useMutation(
    MutationUpdateComment
  );
  return {
    updateComment,
    updateCommentData: data?.update_movie_app_comments_by_pk,
    updateCommentLoading: loading,
    updateCommentError: error,
  };
}
