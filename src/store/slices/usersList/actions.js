import axios from "axios";

export async function setUserList(state, {payload}) {
  if(!state.usersList){
    const response = await axios.get(process.env.API_URL + "/user/all");
    //TODO cargar la lista en state
    state.usersList = response;
  }
}
