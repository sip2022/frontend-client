// FUNCIONES AXIOS
import axios from "axios";

export async function register(input) {
  try {
    const response = await axios.post(process.env.REACT_APP_API_URL + "/register", {
      ...input,
      // dni: parseInt(input.dni),
      // age: parseInt(input.age),
      // phone: parseInt(input.phone),
    });
  } catch (error) {
    console.log(error);
    return false;
  }
  console.log("Se registro");
  return true;
}