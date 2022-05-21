import axios from "axios";
import authHeader from "./auth-Header";

const API_URL = "https://sip-api-dev.herokuapp.com";

/* 
  Esta clase contiene funciones que requieren cargar datos en el store.
  Como ejemplo --> cargar los datos del usuario en userDataSlice
*/
class UserService {

  getUserList() {
    // return axios.get(API_URL + '/user/all', {headers: authHeader() });
    console.log("Hola");
    return "hola2";
  }

  cargarTimeslots() {
    
  }
}

export default new UserService();
