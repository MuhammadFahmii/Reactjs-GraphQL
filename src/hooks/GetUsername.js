import { useLazyQuery } from "@apollo/client";
import { QueryGetUsername } from "../graphql/Query";

export default function GetUsername() {
  const [getUsername, { data, loading, error }] =
    useLazyQuery(QueryGetUsername);
  return {
    getUsername,
    getUsernameData: data?.movie_app_users,
    getUsernameLoading: loading,
    getUsernameError: error,
  };
}
