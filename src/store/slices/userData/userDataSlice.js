import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// Para traer las acciones del slice
import { setState } from "./actions";

export const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    firstName: "Sebastian",
    lastName: "Marchetti",
    dni: "99999999",
    phone: "2323",
    email: "seba@gmail.com",
    age: "23",
    roles: [],
    turnos: [],
  },
  reducers: {
    // (state, action) -> state: el estado actual, 'initialState' / action: payload
    // desde loginForm login(input) ---> reducer hace loginUsuario(sate, payload = input)
    setearEstado: setState
  },
});

export default userDataSlice.reducer;
export const { setearEstado } = userDataSlice.actions;

// ---------- End createSlice ----------
// axios.interceptors.request.use((request) => {
//   console.log(request);
//   return request;
// });