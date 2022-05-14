// Funciones actions de redux SOLO APRA MODIFICAR EL ESTADO DIRECTAMENTE

export function setState(state, {payload}) {
  const {
    firstName,
    lastName,
    dni,
    phone,
    email,
    age,
    roles,
    accessToken
  } = payload;
  state.firstName = firstName;
  state.lastName = lastName;
  state.dni = dni;
  state.phone = phone;
  state.email = email;
  state.age = age;
  state.roles = roles;
  // const {
  //   accesToken,
  //   firstName,
  //   lastName,
  //   email,
  //   dni,
  //   phone,
  //   age,
  //   roles,
  // } = payload;
}