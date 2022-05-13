import axios from "axios";
// Funciones actions de redux SOLO APRA MODIFICAR EL ESTADO DIRECTAMENTE

export function registrarUsuario(state, { payload }) {
  
}

// export function registrarUsuario(state, payload ) {
//   const flag = false;
//   axios
//     .post(process.env.REACT_APP_API_URL + "/register", {
//       ...payload,
//       dni: parseInt(payload.dni),
//       age: parseInt(payload.age),
//       phone: parseInt(payload.phone),
//       // rolesNames: ["USER"],
//     })
//     .then((data) => {
//       console.log("Llego bien");
//       flag = true;
//     })
//     .catch((error) => {
//       console.log("No llego");
//     });
//   return flag;
// }

// TODO ARREGLAR LOGIN
export function loginUsuario(state, payload) {
  //   return await axios
  //     .post(process.env.REACT_APP_API_URL + "/login", {
  //       payload,
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       const {
  //         accesToken,
  //         firstName,
  //         lastName,
  //         email,
  //         dni,
  //         phone,
  //         age,
  //         roles,
  //         turnos,
  //       } = response.data;
  //       // // seteo todo el estado
  //       // // TODO demas campos del estado se actualizan...
  //       // state.firstName = firstName;
  //       // state.lastName = lastName;
  //       // state.email = email;
  //       // state.dni = dni;
  //       // state.phone = phone;
  //       // state.age = age;
  //       // state.roles = roles;
  //       // state.turnos = turnos;
  //       // localStorage.setItem("user", accesToken);
  //       alert("Logueado");
  //     })
  //     .catch((error) => {
  //       alert("No logueado");
  //     });
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
