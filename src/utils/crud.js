// FUNCIONES AXIOS
import axios from "axios";
import authHeader from "../services/auth-Header";

export async function register(input) {
  var result = {
    message: "",
  };
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/register",
      {
        ...input,
      }
    );
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.message);
      result.message = error.response.data.message;
    } else {
      result.message =
        "Hubo un problema con el Registro. Vuelva a intentarlo más tarde.";
    }
  }
  return result;
}

export async function login(input) {
  var result = {
    message: "",
  };
  try {
    const response = await axios
      .post(process.env.REACT_APP_API_URL + "/login", {
        ...input,
      })
      .then((response) => {
        console.log(response.data);
        console.log(response.headers);
        console.log("Logueado");
        result = { ...result, ...response.data };
      });
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.message);
      result.message = error.response.data.message;
    } else {
      result.message =
        "Hubo un problema con el Login. Vuelva a intentarlo más tarde.";
    }
  }
  return result;
}

export async function getUser(token) {
  // TODO necesito el endpoint
  const response = await axios.get(process.env.REACT_APP_API_URL + "/", {});
}
