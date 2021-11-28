import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://maximum-panther-57.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret":
      "sL1DAWY2OAOn7hD5L2UJ3TmWaZ5fdX5L60ChuLOboKrwE7f9dCkbRElXJjxS2Qwr",
  },
  cache: new InMemoryCache(),
});

export default client;
