import { createSlice } from "@reduxjs/toolkit";

const UserSlices = createSlice({
  name: "user",
  initialState: {
    users: "",
  },
  reducers: {
    addActive: (state, action) => {
      const activeUser = action.payload;
      state.users = activeUser;
    },
  },
});

export const { addActive } = UserSlices.actions;
export default UserSlices.reducer;
