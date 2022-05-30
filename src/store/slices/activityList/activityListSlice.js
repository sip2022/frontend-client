import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../../services/user.service";
import { setActivityList } from "./actions";

// Ascyn thunk -> para hacer dispatch de acciones que son asincronas
export const load_list_activity = createAsyncThunk(
  "activity/loadActivities",
  async () => {
    console.log("Cargando lista de actividades...");
    return await userService.get_Activity_List().then((response) => {
      return response;
    });
  }
);

export const activityListSlice = createSlice({
  name: "activityList",
  initialState: {
    activityList: null,
  },
  reducers: {
    // (state, action) -> state: el estado actual, 'initialState' / action: payload
    set_ActivityLista: setActivityList,
  },
  extraReducers: {
    [load_list_activity.pending]: (state, action) => {
      console.log("Pending actividades");
    },
    [load_list_activity.fulfilled]: (state, action) => {
      console.log("Fulfilled actividades");
      state.activityList = action.payload;
    },
    [load_list_activity.rejected]: (state, action) => {
      console.log("Failed actividades");
      console.log(action);
      state.activityList = null;
    },
  },
});

export default activityListSlice.reducer;
export const { set_ActivityLista } = activityListSlice.actions;

// ---------- End createSlice ----------
