import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../../services/user.service";
// Para traer las acciones del slice
import { setState, setTurnos, setEmail, resetUser } from "./actions";

// Ascyn thunk -> para hacer dispatch de acciones que son asincronas
export const load_user_turnos = createAsyncThunk(
  "user/loadUserTurnos",
  async (_, thunkAPI) => {
    return await userService
      .get_Turnos_ByUserId(thunkAPI.getState().user.id)
      .then((response) => {
        return response;
      });
  }
);

export const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    id: null,
    firstName: null,
    lastName: null,
    dni: null,
    phone: null,
    email: null,
    birthDate: null,
    roles: null,
    turnos: null,
  },
  reducers: {
    // (state, action) -> state: el estado actual, 'initialState' / action: payload
    // desde loginForm login(input) ---> reducer hace loginUsuario(sate, payload = input)
    setearEstado: setState,
    setearUserTurnos: setTurnos,
    setearEmail: setEmail,
    reiniciarUser: resetUser,
  },
  extraReducers: {
    [load_user_turnos.pending]: (state, action) => {},
    [load_user_turnos.fulfilled]: (state, action) => {
      state.turnos = action.payload;
    },
    [load_user_turnos.rejected]: (state, action) => {
      console.log(action);
      state.turnos = [];
    },
  },
});

export default userDataSlice.reducer;
export const { setearEstado, setearUserTurnos, setearEmail, reiniciarUser } =
  userDataSlice.actions;

// ---------- End createSlice ----------
// axios.interceptors.request.use((request) => {
//   console.log(request);
//   return request;
// });
