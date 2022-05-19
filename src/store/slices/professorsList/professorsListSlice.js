// redux estado sobre lista de usuarios
import { createSlice } from "@reduxjs/toolkit";
import { setProfessorsList } from "./actions";

export const professorsListSlice = createSlice({
  name: "professorsList",
  initialState: {
    professorsList: null,
  },
  reducers: {
    setProfessors: setProfessorsList,
  },
});

export default professorsListSlice.reducer;
export const { setProfessors } = professorsListSlice.actions 

// ---------- End createSlice ----------
