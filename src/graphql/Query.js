import gql from "graphql-tag";
export const QueryGetComments = gql`
  query MyQuery($id_movie: Int!) {
    movie_app_comments(where: { id_movie: { _eq: $id_movie } }, limit: 5) {
      comment
      created_at
      user {
        username
      }
    }
  }
`;
