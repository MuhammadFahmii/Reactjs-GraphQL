import { useMutation } from "@apollo/client";
import { MutationUpdateComment } from "../graphql/Mutation";
import { QueryGetComments } from "../graphql/Query";

export default function UpdateComment(id_movie) {
  const [updateComment, { data, loading, error }] = useMutation(
    MutationUpdateComment,
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
    updateComment,
    updateCommentData: data?.update_movie_app_comments_by_pk,
    updateCommentLoading: loading,
    updateCommentError: error,
  };
}
