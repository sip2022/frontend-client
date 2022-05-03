import axios from "axios";

export async function getActivityList(state) {
  try {
    // TODO endpoint para obtener todas las listas
    const response = await axios.get(process.env.API_URL + "/activityList");
    console.log(response);
    const data = response.data;
    // seteo todo el estado
    state.activityList = data;
  } catch (error) {
    console.log(error);
    return new Error(error);
  }
}