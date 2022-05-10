// redux estado sobre lista de usuarios
import { createSlice } from "@reduxjs/toolkit";
import { loadProfessorsList } from "./actions";

export const professorsListSlice = createSlice({
  name: "professorsList",
  initialState: {
    professorsList: [],
  },
  reducers: {
    loadProfessorsList: loadProfessorsList,
  },
});

export default professorsListSlice.reducer;

// ---------- End createSlice ----------
