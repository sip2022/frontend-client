import { createSlice } from "@reduxjs/toolkit";
import { setActivityList } from "./actions";

export const activityListSlice = createSlice({
  name: "activityList",
  initialState: {
    activityList: null,
  },
  reducers: {
    // (state, action) -> state: el estado actual, 'initialState' / action: payload
    setActivityLista: setActivityList
  },
});

export default activityListSlice.reducer;
export const { setActivityLista } = activityListSlice.actions;

// ---------- End createSlice ----------
