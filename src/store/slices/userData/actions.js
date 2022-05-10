import axios from "axios";

export function registrarUsuario(state, { payload }) {
  return axios.post(process.env.API_URL + "/register", {
    ...payload,
    phone: parseInt(payload.phone),
    rolesNames: ["USER"],
  });
}

export async function loginUsuario(state, { payload }) {
  try {
    console.log("user");
    console.log(state);
    // const response = await axios.post(process.env.API_URL + "/login", {
    //   payload,
    // });
    // console.log(response);
    // const { accesToken, firstName, lastName, email, dni, phone, age, roles, turnos } =
    //   response.data;

    // // seteo todo el estado
    // // TODO demas campos del estado se actualizan...
    // state.firstName = firstName;
    // state.lastName = lastName;
    // state.email = email;
    // state.dni = dni;
    // state.phone = phone;
    // state.age = age;
    // state.roles = roles;
    // state.turnos = turnos;

    // localStorage.setItem("user", accesToken);
  } catch (error) {
    console.log(error);
    return new Error(error);
  }
}

// estas acciones las llama el slice, para añadirlas a su recurder
// module.exports = {
//   registrarUsuario:
//     (state, {payload}) => () => {
//       return axios.post(process.env.API_URL + "/register", {
//         ...payload,
//         phone: parseInt(payload.phone),
//         rolesNames: ["USER"],
//       });
//     },
//   // ---------- ---------- ----------
//   loginUsuario: (state, {payload}) => () => {
//     return axios
//       .post(process.env.API_URL + "/login", {
//         payload,
//       })
//       .then((response) => {
//         console.log(response);
//         const { accesToken, nombre } = response.data;
//         // seteo todo el estado
//         state.nombre = nombre;
//         // TODO demas campos del estado se actualizan...
//         localStorage.setItem("user", accesToken);
//       })
//       .catch((error) => {
//         console.log(error);
//         return new Error(error);
//       });
//   },
// };
