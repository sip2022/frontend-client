import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../../services/user.service";
// Para traer las acciones del slice
import { setState, setTurnos } from "./actions";

// Ascyn thunk -> para hacer dispatch de acciones que son asincronas
export const load_user_turnos = createAsyncThunk(
  "user/loadUserTurnos",
  async (_, thunkAPI) => {
    console.log("Cargando lista de turnos del usuario...");
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
    age: null,
    roles: null,
    turnos: null,  
    status: null,  
  },
  reducers: {
    // (state, action) -> state: el estado actual, 'initialState' / action: payload
    // desde loginForm login(input) ---> reducer hace loginUsuario(sate, payload = input)
    setearEstado: setState,
    setearUserTurnos: setTurnos
  },
  extraReducers: {
    [load_user_turnos.pending]: (state, action) => {
      console.log("Pending turnos del usuario");
    },
    [load_user_turnos.fulfilled]: (state, action) => {
      console.log("Fulfilled turnos del usuario");
      state.turnos = action.payload;
    },
    [load_user_turnos.rejected]: (state, action) => {
      console.log("Failed turnos del usuario");
      console.log(action);
      state.turnos = [];
    },
  },
});

export default userDataSlice.reducer;
export const { setearEstado, setearUserTurnos } = userDataSlice.actions;

// ---------- End createSlice ----------
// axios.interceptors.request.use((request) => {
//   console.log(request);
//   return request;
// });
