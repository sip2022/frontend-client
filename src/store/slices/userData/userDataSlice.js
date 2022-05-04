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

axios.interceptors.request.use((request) => {
  console.log(request);
  return request;
});

// TODO ARREGLAR CONEXION CON EL BACK ---> AXIOS DEVOLVIA 403 (el navegador lo indica como 200 pero sigue yendo al catch)

// Ejemplo con tryCatch y async await
// try {
//   const respuesta = await axios
//     .post(
//       process.env.API_URL + "/login",
//       {
//         input
//       }
//     )
//   console.log(respuesta);
//   const {accesToken, nombre} = respuesta.data;
//   //   dispatchEvent(setNombre(nombre))
//   // TODO demas campos del estado se actualizan...
//   //   // localStorage.setItem("user", accessToken)
//   return respuesta
// } catch (error) {
//   console.log(error)
//   return error
// }

// MOCK de la funcionalidad de logueo
// export const loginUsuario = (name, password) => (dispatch) => {
//   dispatch(setUsername("<" + name + ">"))
// };
