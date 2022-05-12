import axios from "axios";

// export async function loadProfessorsList(state) {
export function loadProfessorsList(state) {
  try {
    if (!state.professorsList) {
      // TODO Carga profesores en la lista
      // const response = await axios.get(process.env.API_URL + "/");
      // console.log(response)
      // state.professorsList = response;
      state.professorsList = [
        {
          id: 1,
          email: "profesor@gmail.com",
          dni: 12345678,
          phone: 2323,
          firstName: "Sindy",
          lastName: "Nero",
          age: 28,
        },
        {
          id: 2,
          email: "profesor2@gmail.com",
          dni: 12345679,
          phone: 2324,
          firstName: "Josue",
          lastName: "Yrion",
          age: 35,
        },
      ];
    }
  } catch (error) {
    console.log(error);
    return new Error(error);
  }
}
