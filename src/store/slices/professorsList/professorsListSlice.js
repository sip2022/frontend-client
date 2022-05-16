// redux estado sobre lista de usuarios
import { createSlice } from "@reduxjs/toolkit";
import { loadProfessorsList } from "./actions";

export const professorsListSlice = createSlice({
  name: "professorsList",
  initialState: {
    professorsList: null,
  },
  reducers: {
    loadProfessors: loadProfessorsList,
  },
});

export default professorsListSlice.reducer;
export const { loadProfessors } = professorsListSlice.actions 

// ---------- End createSlice ----------
