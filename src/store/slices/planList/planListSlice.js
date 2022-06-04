import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../../services/user.service";
// Para traer las acciones del slice
import {  } from "./actions";

// Ascyn thunk -> para hacer dispatch de acciones que son asincronas
export const load_list_planes = createAsyncThunk(
  "planes/loadPlanes",
  async () => {
    return await userService.get_Planes_List().then((response) => {
      return response;
    });
  }
);

export const planListSlice = createSlice({
  name: "planList",
  initialState: {
    planList: null
  },
  reducers: {
    // (state, action) -> state: el estado actual, 'initialState' / action: payload
  },
  extraReducers: {
    [load_list_planes.pending]: (state, action) => {
    },
    [load_list_planes.fulfilled]: (state, action) => {
      state.planList = action.payload;
    },
    [load_list_planes.rejected]: (state, action) => {
      console.log(action);
      state.planList = null;
    },
  },
});

export default planListSlice.reducer;
export const {  } = planListSlice.actions;