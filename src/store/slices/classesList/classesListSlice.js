import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../../services/user.service.js";
import { setClassList } from "./actions.js";

// Ascyn thunk -> para hacer dispatch de acciones que son asincronas
export const load_list_class = createAsyncThunk(
  "class/loadClasses",
  async () => {
    return await userService.get_Class_List().then((response) => {
      return response;
    });
  }
);


export const classListSlice = createSlice({
  name: "classList",
  initialState: {
    classList: null,
    status: null,
  },
  reducers: {
    // (state, action) -> state: el estado actual, 'initialState' / action: payload
    set_ClassLista: setClassList,
  },
  extraReducers: {
    [load_list_class.pending]: (state, action) => {
      state.satus = "loading"
    },
    [load_list_class.fulfilled]: (state, action) => {
      state.satus = "loaded"
      state.classList = action.payload;
    },
    [load_list_class.rejected]: (state, action) => {
      console.log(action);
      state.satus = "failed"
      state.classList = null;
    },
  },
});

export default classListSlice.reducer;
export const { set_ClassLista } = classListSlice.actions;

// ---------- End createSlice ----------
