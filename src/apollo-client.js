import { ApolloClient, InMemoryCache } from "@apollo/client";

import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

const httpLink = new HttpLink({
  uri: "https://maximum-panther-57.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret":
      "sL1DAWY2OAOn7hD5L2UJ3TmWaZ5fdX5L60ChuLOboKrwE7f9dCkbRElXJjxS2Qwr",
  },
});

const wsLink = new WebSocketLink({
  uri: "wss://maximum-panther-57.hasura.app/v1/graphql",
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        "x-hasura-admin-secret":
          "sL1DAWY2OAOn7hD5L2UJ3TmWaZ5fdX5L60ChuLOboKrwE7f9dCkbRElXJjxS2Qwr",
      },
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
