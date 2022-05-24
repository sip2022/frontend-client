import { createSlice } from "@reduxjs/toolkit";
import { addTimeslot, setTimeslotList } from "./actions.js";

export const timeslotListSlice = createSlice({
  name: "timeslotList",
  initialState: {
    timeslotList: null,
  },
  reducers: {
    // (state, action) -> state: el estado actual, 'initialState' / action: payload
    setTimeLista: setTimeslotList,
    add_Timeslot: addTimeslot
  },
});

export default timeslotListSlice.reducer;
export const { setTimeLista, add_Timeslot } = timeslotListSlice.actions;

// ---------- End createSlice ----------
