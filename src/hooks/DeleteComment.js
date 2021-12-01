import { useMutation } from "@apollo/client";
import { MutationDeleteComment } from "../graphql/Mutation";
import { QueryGetComments } from "../graphql/Query";

export default function DeleteComment(id_movie) {
  const [deleteComment, { data, loading, error }] = useMutation(
    MutationDeleteComment,
    {
      refetchQueries: [
        {
          query: QueryGetComments,
          variables: { id_movie },
        },
      ],
    }
  );
  return {
    deleteComment,
    deleteCommentData: data?.delete_movie_app_comments_by_pk,
    deleteCommentLoading: loading,
    deleteCommentError: error,
  };
}
