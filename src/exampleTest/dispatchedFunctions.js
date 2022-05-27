import { setearEstado } from "../store/slices/userData/userDataSlice"

/*
  Este archivo contiene las funciones Load-Dispatch cuyo objetivo es:
    - Recuperar un objeto del back (generalmente una lista).
    - Cargarla en el estado de redux mediante dispatch().

  Estas funciones se llamaran desde los componentes con dispatch(function()).
*/
export const loadActivityListExample = async () => (dispatch, getState) => {
  dispatch(setearEstado({
    firstName: "seba",
    lastName: "lastName",
    dni: "dni",
    phone: "phone",
    email: "email",
    age: "age",
    roles: ["roles"],
  }))
}