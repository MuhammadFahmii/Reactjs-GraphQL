import { useMutation } from "@apollo/client";
import { MutationInsertUser } from "../graphql/Mutation";

export default function InsertUser() {
  const [insertUser, { data, loading, error }] =
    useMutation(MutationInsertUser);
  return {
    insertUser,
    insertUserData: data?.insert_movie_app_users_one,
    insertUserLoading: loading,
    insertUserError: error,
  };
}
