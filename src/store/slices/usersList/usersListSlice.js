// redux estado sobre lista de usuarios
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"; 
import { chargeUserList } from "./actions"

export const usersListSlice = createSlice({
  name: "userList",
  initialState: {
    usersList: []
  },
  reducers: {
    chargeUserList: chargeUserList
  },
});

export default usersListSlice.reducer;
export const { getUserList } = usersListSlice.actions;

// ---------- End createSlice ----------
