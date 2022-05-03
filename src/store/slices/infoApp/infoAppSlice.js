// Informacion sobre la aplicacion
// Ver bien QUE guarda en redux y QUE en localStorage
// El token jwt NO se guarda en redux
import { createSlice } from "@reduxjs/toolkit";
// Para traer las acciones del slice
import {  } from "./actions";

export const infoAppSlice = createSlice({
  name: "infoApp",
  initialState: {
    
  },
  reducers: {
    // (state, action) -> state: el estado actual, 'initialState' / action: payload
  },
});

export default infoAppSlice.reducer;
export const {  } = infoAppSlice.actions;

// ---------- End createSlice ----------