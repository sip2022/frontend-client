// Funciones actions de redux SOLO APRA MODIFICAR EL ESTADO DIRECTAMENTE

export function setState(state, { payload }) {
  const { id, firstName, lastName, dni, phone, email, birthDate, roles, status } =
    payload;
  const now = new Date();
  const age = now.getFullYear() - birthDate[0]
  state.id = id;
  state.firstName = firstName;
  state.lastName = lastName;
  state.dni = dni;
  state.phone = phone;
  state.email = email;
  state.age = age;
  state.roles = roles;
  state.status = status;
}

export function setTurnos(state, { payload }) {
  state.turnos = payload;
}
