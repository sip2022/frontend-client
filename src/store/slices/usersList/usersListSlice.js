// redux estado sobre lista de usuarios
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"; 
import { loadUserList } from "./actions"

export const usersListSlice = createSlice({
  name: "userList",
  initialState: {
    usersList: []
  },
  reducers: {
    loadUserList: loadUserList
  },
});

export default usersListSlice.reducer;
export const { chargeUserList } = usersListSlice.actions;

// ---------- End createSlice ----------
