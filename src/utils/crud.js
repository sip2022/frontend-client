// FUNCIONES AXIOS
import axios from "axios";

export async function register(input) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/register",
      {
        ...input,
      }
    );
  } catch (error) {
    console.log(error.response.data.message);
    return false;
  }
  console.log("Se registro");
  return true;
}

export async function login(input) {
  try {
    const response = await axios
      .post(process.env.REACT_APP_API_URL + "/login", {
        ...input,
      })
      .then((response) => {
        console.log(response);
        // TODO seteo todo el estado
        // const {
        //   accesToken,
        //   firstName,
        //   lastName,
        //   email,
        //   dni,
        //   phone,
        //   age,
        //   roles,
        // } = response.data;
        // setState(data);
        // Y localstore el jwt
        // localStorage.setItem("accessToken", accessToken);
        console.log("Logueado");
      });
  } catch (error) {
    console.log(error.response);
    return false;
  }
  console.log("Se Logueo");
  // return true;
  return true;
}

export async function getUser(token) {
  // TODO necesito el endpoint
  const response = await axios.get(process.env.REACT_APP_API_URL + "/", {});
}
