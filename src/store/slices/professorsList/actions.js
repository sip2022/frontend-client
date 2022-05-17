export function setProfessorsList(state, {payload}) {
  console.log("Lista de Profesores");
  console.log(payload);
  state.professorsList = payload;
}
