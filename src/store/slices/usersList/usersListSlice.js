// redux estado sobre lista de usuarios
import { createSlice } from "@reduxjs/toolkit";
import { setUserList } from "./actions"

export const usersListSlice = createSlice({
  name: "userList",
  initialState: {
    usersList: null
  },
  reducers: {
    setear_UserList: setUserList
  },
});

export default usersListSlice.reducer;

// ---------- End createSlice ----------
