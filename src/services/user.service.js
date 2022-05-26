import axios from "axios";
import authHeader from "./auth-Header";

const API_URL = "https://sip-api-dev.herokuapp.com";

/* 
  Esta clase contiene funciones que requieren cargar datos en el store.
  Como ejemplo --> cargar los datos del usuario en userDataSlice
*/
class UserService {
  // Axios GET calls

  getUserList() {
    return axios.get(API_URL + "/user/all", { headers: authHeader() });
  }

  getActivityList() {
    return axios.get(process.env.REACT_APP_API_URL + "/activity/all");
  }

  getTimeslotList() {
    return axios.get(
      process.env.REACT_APP_API_URL + "/timeslot/available-and-ordered"
    );
  }

  getClasses_ByActId(id) {
    return axios.get(process.env.REACT_APP_API_URL + "/available-class/by-activity-id/" + id);
  }

  getProfessorList() {
    const DUMMY_DATA = [
      // Profesor Mock
      {
        id: "8e7b5a76-0ee6-4645-9f19-76eb4e7b4c2a",
        dni: 123987,
        email: "professor@mail.com",
        firstName: null,
        lastName: null,
        birthDate: null,
        phone: null,
        status: "ACTIVE",
        roles: ["ROLE_PROFESSOR"],
      },
    ];
    return DUMMY_DATA;
  }
}

export default new UserService();
