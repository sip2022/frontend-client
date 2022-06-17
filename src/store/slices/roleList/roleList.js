import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../../services/user.service";

// Ascyn thunk -> para hacer dispatch de acciones que son asincronas
export const load_list_role = createAsyncThunk(
  "role/loadRoles",
  async () => {
    return await userService.get_Roles_List().then((response) => {
      return response;
    });
  }
);

export const roleListSlice = createSlice({
  name: "roleList",
  initialState: {
    roleList: null,
    status: null
  },
  reducers: {
    // (state, action) -> state: el estado actual, 'initialState' / action: payload
  },
  extraReducers: {
    [load_list_role.pending]: (state, action) => {
      state.status = "pending";
    },
    [load_list_role.fulfilled]: (state, action) => {
      state.activityList = action.payload;
      state.status = "fulfilled";
    },
    [load_list_role.rejected]: (state, action) => {
      console.log(action);
      state.activityList = null;
      state.status = "rejected";
    },
  },
});

export default roleListSlice.reducer;
export const {  } = roleListSlice.actions;

// ---------- End createSlice ----------
