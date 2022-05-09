import axios from "axios";

// export async function loadProfessorsList(state) {
export function loadProfessorsList(state) {
  if(!state.professorsList){
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
    ]
  }
}




// UNA ACTIVIDAD
// {
//   id: 1,
//   name: "Actividad X",
//   basePrice: 3.00,
//   professor: "Sindy Nero",
//   atendeesLimit: 10,
//   appointments: [
//     {
//       startTime: {
//         hour: 13,
//         minute: 30
//       },
//       endTime: {
//         hour: 14,
//         minute: 30
//       }
//     }
//   ]
// }