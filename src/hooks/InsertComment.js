import { useMutation } from "@apollo/client";
import { MutationInsertComment } from "../graphql/Mutation";
import { QueryGetComments } from "../graphql/Query";

export default function InsertComment(id_movie) {
  const [insertComment, { data, loading, error }] = useMutation(
    MutationInsertComment,
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
    insertComment,
    insertCommentData: data?.insert_movie_app_comments_one,
    insertCommentLoading: loading,
    insertCommentError: error,
  };
}
