import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../../services/user.service.js";
import { addTimeslot, setTimeslotList, updateTimeslot } from "./actions.js";

// Ascyn thunk -> para hacer dispatch de acciones que son asincronas
export const load_list_timeslot = createAsyncThunk(
  "timeslot/loadTimeslots",
  async () => {
    return await userService.get_Timeslot_List().then((response) => {
      return response;
    });
  }
);

export const timeslotListSlice = createSlice({
  name: "timeslotList",
  initialState: {
    timeslotList: null,
    status: null
  },
  reducers: {
    // (state, action) -> state: el estado actual, 'initialState' / action: payload
    set_TimeLista: setTimeslotList,
    add_Timeslot: addTimeslot,
    upd_Timeslot: updateTimeslot,
  },
  extraReducers: {
    [load_list_timeslot.pending]: (state, action) => {
      state.status = "pending";
    },
    [load_list_timeslot.fulfilled]: (state, action) => {
      state.timeslotList = action.payload;
      state.status = "fulfilled";
    },
    [load_list_timeslot.rejected]: (state, action) => {
      console.log(action);
      state.timeslotList = null;
      state.status = "rejected";
    },
  },
});

export default timeslotListSlice.reducer;
export const { set_TimeLista, add_Timeslot, upd_Timeslot } =
  timeslotListSlice.actions;

// ---------- End createSlice ----------
