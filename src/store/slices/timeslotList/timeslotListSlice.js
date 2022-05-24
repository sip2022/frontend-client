import { createSlice } from "@reduxjs/toolkit";
import { addTimeslot, setTimeslotList, updateTimeslot } from "./actions.js";

export const timeslotListSlice = createSlice({
  name: "timeslotList",
  initialState: {
    timeslotList: null,
  },
  reducers: {
    // (state, action) -> state: el estado actual, 'initialState' / action: payload
    set_TimeLista: setTimeslotList,
    add_Timeslot: addTimeslot,
    upd_Timeslot: updateTimeslot
  },
});

export default timeslotListSlice.reducer;
export const { set_TimeLista, add_Timeslot, upd_Timeslot } = timeslotListSlice.actions;

// ---------- End createSlice ----------
