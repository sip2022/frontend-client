// Funciones actions de redux SOLO APRA MODIFICAR EL ESTADO DIRECTAMENTE

export function setState(state, { payload }) {
  const { id, firstName, lastName, dni, phone, email, birthDate, rolesNames } =
    payload;
  state.id = id;
  state.firstName = firstName;
  state.lastName = lastName;
  state.birthDate = birthDate;
  state.dni = dni;
  state.phone = phone;
  state.email = email;
  state.rolesNames = rolesNames;
}

export function setTurnos(state, { payload }) {
  state.turnos = payload;
}
