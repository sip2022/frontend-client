import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../../services/user.service.js";
import { setClassList } from "./actions.js";

// Ascyn thunk -> para hacer dispatch de acciones que son asincronas
export const load_list_timeslot = createAsyncThunk(
  "class/loadClasses",
  async () => {
    console.log("Cargando lista de clases...");
    return await userService.get_Class_List().then((response) => {
      return response;
    });
  }
);


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
