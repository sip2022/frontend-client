import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../../services/user.service";
import { setProfessorsList } from "./actions";

// Ascyn thunk -> para hacer dispatch de acciones que son asincronas
export const load_list_professor = createAsyncThunk(
  "professor/loadProfessor",
  async () => {
    return await userService.get_Professor_List().then((response) => {
      return response;
    });
  }
);

export const professorsListSlice = createSlice({
  name: "professorsList",
  initialState: {
    professorsList: null,
  },
  reducers: {
    setProfessors: setProfessorsList,
  },
  extraReducers: {
    [load_list_professor.pending]: (state, action) => {
    },
    [load_list_professor.fulfilled]: (state, action) => {
      state.professorsList = action.payload;
    },
    [load_list_professor.rejected]: (state, action) => {
      console.log(action);
      state.professorsList = null;
    },
  },
});

export default professorsListSlice.reducer;
export const { setProfessors } = professorsListSlice.actions;

// ---------- End createSlice ----------
