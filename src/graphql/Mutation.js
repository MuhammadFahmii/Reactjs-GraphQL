import gql from "graphql-tag";

export const MutationInsertComment = gql`
  mutation MutationInsertComment(
    $id_movie: Int!
    $id_user: Int!
    $comment: String!
  ) {
    insert_movie_app_comments_one(
      object: { id_movie: $id_movie, id_user: $id_user, comment: $comment }
    ) {
      id
    }
  }
`;

export const MutationDeleteComment = gql`
  mutation MutationDeleteComment($id: Int!) {
    delete_movie_app_comments_by_pk(id: $id) {
      id
    }
  }
`;

export const MutationUpdateComment = gql`
  mutation MutationUpdateComment($id: Int!, $comment: String!) {
    update_movie_app_comments_by_pk(
      pk_columns: { id: $id }
      _set: { comment: $comment }
    ) {
      id
    }
  }
`;

export const MutationInsertFavouriteMovie = gql`
  mutation MutationInsertFavouriteMovie(
    $id_user: Int!
    $image: String!
    $overview: String!
    $title: String!
    $id_movie: Int!
  ) {
    insert_movie_app_favourite_movies_one(
      object: {
        id_user: $id_user
        image: $image
        overview: $overview
        title: $title
        id_movie: $id_movie
      }
    ) {
      id
    }
  }
`;
