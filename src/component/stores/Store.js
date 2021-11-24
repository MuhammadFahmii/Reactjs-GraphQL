import { configureStore } from "@reduxjs/toolkit";
import UserSlices from "./UserSlices";

export default configureStore({
  reducer: {
    userActive: UserSlices,
  },
});
