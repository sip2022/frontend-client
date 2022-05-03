import { createSlice } from "@reduxjs/toolkit";
// Para traer las acciones del slice
import { getActivityList } from "./actions";

export const activityListSlice = createSlice({
  name: "activityList",
  initialState: {
    activityList: [],
  },
  reducers: {
    // (state, action) -> state: el estado actual, 'initialState' / action: payload
    getActivities: getActivityList,
  },
});

export default activityListSlice.reducer;
export const { getActivities } = activityListSlice.actions;

// ---------- End createSlice ----------
