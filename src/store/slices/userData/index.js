import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.interceptors.request.use((request) => {
  console.log(request);
  return request;
});

const initialState = {
  username: "",
  tokenJWT: "",
};

const API_URL = "https://sip-api-dev.herokuapp.com";

const headers = {
  "Content-Type": "application/json",
  // 'Access-Control-Allow-Origin': '*'
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    // (state, action) -> state: el estado actual, 'initialState' / action:
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setJWT: (state, action) => {
      state.tokenJWT = action.payload;
    },
  },
});

export default userDataSlice.reducer;
export const { setUsername, setJWT } = userDataSlice.actions;

// Esta funcion la usran los componentes para registrar un usuario
export const registrarUsuario =
  (firstName, lastName, dni, email, age, phone, password) => () => {
    return axios.post(
      API_URL + "/register",
      JSON.stringify({
        dni: dni,
        password: password,
        email: email,
        firstName: firstName,
        lastName: lastName,
        age: age,
        // phone: JSON.stringify(phone),
        phone: parseInt(phone),
        rolesNames: ["USER"],
      }),
      {
        headers: headers,
      }
    );
  };

// TODO ARREGLAR CONEXION CON EL BACK ---> AXIOS DEVOLVIA 403 (el navegador lo indica como 200 pero sigue yendo al catch)
export const loginUsuario = (email, password) => () => {
  return axios
    .post(
      API_URL + "/login",
      JSON.stringify({
        email: email,
        password: password,
      }),
      {
        headers: headers,
      }
    )
    .then((response) => {
      console.log(response.data);
      if (response.data.accessToken) {
        // localStorage.setItem("user", JSON.stringify(response.data));
        // const jwt = response.headers.get('Authorization')
        // localStorage.setItem("user", jwt)
      }
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject
    });
};

// MOCK de la funcionalidad de logueo
// export const loginUsuario = (name, password) => (dispatch) => {
//   dispatch(setUsername("<" + name + ">"))
// };

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
