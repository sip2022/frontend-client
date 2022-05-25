import { createSlice } from "@reduxjs/toolkit";
import { setActivityList } from "./actions";

export const activityListSlice = createSlice({
  name: "activityList",
  initialState: {
    activityList: null,
  },
  reducers: {
    // (state, action) -> state: el estado actual, 'initialState' / action: payload
    set_ActivityLista: setActivityList
  },
});

export default activityListSlice.reducer;
export const { set_ActivityLista } = activityListSlice.actions;

// ---------- End createSlice ----------
