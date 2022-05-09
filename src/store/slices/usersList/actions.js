import axios from "axios";

export async function loadUserList(state) {
  try {
    const response = await axios.get(process.env.API_URL + "/user/all");
    //TODO cargar la lista en state
    console.log(response)
    // state.userList = response;
  } catch (error) {
    console.log(error);
    return new Error(error);
  }
}
