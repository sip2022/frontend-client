import { createSlice } from "@reduxjs/toolkit";
import { setClassList } from "./actions.js";

export const classListSlice = createSlice({
  name: "classList",
  initialState: {
    classList: null,
  },
  reducers: {
    // (state, action) -> state: el estado actual, 'initialState' / action: payload
    set_ClassLista: setClassList,
  },
});

export default classListSlice.reducer;
export const { set_ClassLista } = classListSlice.actions;

// ---------- End createSlice ----------
