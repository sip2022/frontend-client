import axios from "axios";

export async function loadUserList(state) {
  try {
    if(!state.usersList){
      const response = await axios.get(process.env.API_URL + "/user/all");
      //TODO cargar la lista en state
      state.usersList = response;
    }
  } catch (error) {
    console.log(error);
    return new Error(error);
  }
}
