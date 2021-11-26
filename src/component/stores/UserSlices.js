import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  id: "",
  username: "",
  password: "",
};

const UserSlices = createSlice({
  name: "user",
  initialState: {
    users: initialValue,
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
