import { createSlice } from "@reduxjs/toolkit";
// Para traer las acciones del slice
import {  } from "./actions";

export const planListSlice = createSlice({
  name: "planList",
  initialState: {
    planList: []
  },
  reducers: {
    // (state, action) -> state: el estado actual, 'initialState' / action: payload
  },
});

export default planListSlice.reducer;
export const {  } = planListSlice.actions;