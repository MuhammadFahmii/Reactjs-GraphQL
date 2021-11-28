import gql from "graphql-tag";
export const QueryGetComments = gql`
  query MyQuery($id_movie: Int!) {
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
  query MyQuery($id: Int!) {
    movie_app_comments_by_pk(id: $id) {
      id
      comment
    }
  }
`;
