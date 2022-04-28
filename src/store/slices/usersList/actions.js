import axios from "axios";

export async function chargeUserList(state) {
  const response = await axios.get(process.env.API_URL + "/user/all");
  //TODO cargar la lista en state
  console.log(response)
  // state.userList = response;
}
