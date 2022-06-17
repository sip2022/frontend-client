// redux estado sobre lista de usuarios
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../../../services/user.service";
import { setUserList } from "./actions"

// Ascyn thunk -> para hacer dispatch de acciones que son asincronas
export const load_list_user = createAsyncThunk(
  "userList/loadUsersList",
  async () => {
    return await userService.get_User_List().then((response) => {
      return response;
    });
  }
);

export const usersListSlice = createSlice({
  name: "userList",
  initialState: {
    userList: null,
    status: null
  },
  reducers: {
    set_UserList: setUserList
  },
  extraReducers: {
    [load_list_user.pending]: (state, action) => {
      state.status = "pending";
    },
    [load_list_user.fulfilled]: (state, action) => {
      state.activityList = action.payload;
      state.status = "fulfilled";
    },
    [load_list_user.rejected]: (state, action) => {
      console.log(action);
      state.activityList = null;
      state.status = "rejected";
    },
  },
});

export default usersListSlice.reducer;
export const { set_UserList } = usersListSlice.actions;

// ---------- End createSlice ----------
