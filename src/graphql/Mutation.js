import gql from "graphql-tag";

export const MutationInsertComment = gql`
  mutation MyMutation($id_movie: Int!, $id_user: Int!, $comment: String!) {
    insert_movie_app_comments_one(
      object: { id_movie: $id_movie, id_user: $id_user, comment: $comment }
    ) {
      id
    }
  }
`;

export const MutationDeleteComment = gql`
  mutation MyMutation($id: Int!) {
    delete_movie_app_comments_by_pk(id: $id) {
      id
    }
  }
`;

export const MutationUpdateComment = gql`
  mutation MyMutation($id: Int!, $comment: String!) {
    update_movie_app_comments_by_pk(
      pk_columns: { id: $id }
      _set: { comment: $comment }
    ) {
      id
    }
  }
`;
