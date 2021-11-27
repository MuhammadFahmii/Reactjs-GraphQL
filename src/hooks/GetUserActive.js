import { useSelector } from "react-redux";
export default function GetUserActive() {
  const username = useSelector((state) => {
    if (state.userActive.users.username !== "")
      return state.userActive.users.username;
  });
  const id_user = useSelector((state) => {
    if (state.userActive.users.id !== "") return state.userActive.users.id;
  });
  return { id_user, username };
}
