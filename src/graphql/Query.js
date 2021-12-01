import gql from "graphql-tag";
export const QueryGetComments = gql`
  query QueryGetComments($id_movie: Int!) {
    movie_app_comments(where: { id_movie: { _eq: $id_movie } }, limit: 5) {
      id
      comment
      created_at
      user {
        id
        username
      }
    }
  }
`;

export const QueryGetCommentById = gql`
  query QueryGetCommentById($id: Int!) {
    movie_app_comments_by_pk(id: $id) {
      id
      comment
    }
  }
`;

export const QueryGetFavouriteMovie = gql`
  query QueryGetFavouriteMovie($id: Int!) {
    movie_app_favourite_movies(where: { id_user: { _eq: $id } }) {
      id
      image
      overview
      title
      id_movie
    }
  }
`;

export const QueryGetUsername = gql`
  query QueryGetUsername($username: String!, $password: String!) {
    movie_app_users(
      where: {
        username: { _eq: $username }
        _and: { password: { _eq: $password } }
      }
    ) {
      id
      username
    }
  }
`;
