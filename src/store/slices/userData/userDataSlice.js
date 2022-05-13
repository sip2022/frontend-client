import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// Para traer las acciones del slice
import { loginUsuario, registrarUsuario } from "./actions";

export const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    firstName: "",
    lastName: "",
    dni: "",
    phone: "",
    email: "",
    age: "",
    avatarURL: "",
    roles: [],
    turnos: [],
  },
  reducers: {
    // (state, action) -> state: el estado actual, 'initialState' / action: payload
    // desde loginForm login(input) ---> reducer hace loginUsuario(sate, payload = input)
    login: loginUsuario,
    registrar: registrarUsuario,
  },
});

export default userDataSlice.reducer;
export const { login, registrar } = userDataSlice.actions;

// ---------- End createSlice ----------
