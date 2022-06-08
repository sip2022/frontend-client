// Funciones actions de redux SOLO APRA MODIFICAR EL ESTADO DIRECTAMENTE

export function setState(state, { payload }) {
  const { id, firstName, lastName, dni, phone, email, birthDate, roles } =
    payload;
  state.id = id;
  state.firstName = firstName;
  state.lastName = lastName;
  state.birthDate = birthDate;
  state.dni = dni;
  state.phone = phone;
  state.email = email;
  state.roles = roles;
}

export function setEmail(state, { payload }) {
  state.email = payload;
}

export function setTurnos(state, { payload }) {
  state.turnos = payload;
}
