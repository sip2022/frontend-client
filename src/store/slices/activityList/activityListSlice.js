import { createSlice } from "@reduxjs/toolkit";
import { loadActivityList } from "./actions";

export const activityListSlice = createSlice({
  name: "activityList",
  initialState: {
    activityList: null,
  },
  reducers: {
    // (state, action) -> state: el estado actual, 'initialState' / action: payload
    loadActivityLista: loadActivityList
  },
});

export default activityListSlice.reducer;
export const { loadActivityLista } = activityListSlice.actions;

// ---------- End createSlice ----------
