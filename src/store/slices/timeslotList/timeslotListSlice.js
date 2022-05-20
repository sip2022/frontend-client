import { createSlice } from "@reduxjs/toolkit";
import { setTimeslotList } from "./actions.js";

export const timeslotListSlice = createSlice({
  name: "timeslotList",
  initialState: {
    timeslotList: null,
  },
  reducers: {
    // (state, action) -> state: el estado actual, 'initialState' / action: payload
    setTimeLista: setTimeslotList
  },
});

export default timeslotListSlice.reducer;
export const { setTimeLista } = timeslotListSlice.actions;

// ---------- End createSlice ----------
