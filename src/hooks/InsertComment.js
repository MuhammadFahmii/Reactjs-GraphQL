import { useMutation } from "@apollo/client";
import { MutationInsertComment } from "../graphql/Mutation";

export default function InsertComment() {
  const [insertComment, { data, loading, error }] = useMutation(
    MutationInsertComment
  );
  return {
    insertComment,
    insertCommentData: data?.insert_movie_app_comments_one,
    insertCommentLoading: loading,
    insertCommentError: error,
  };
}
