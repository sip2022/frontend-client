import axios from "axios";
import authHeader from "./auth-Header";

const API_URL = "https://sip-api-dev.herokuapp.com";

/* 

  Esta clase contiene funciones para recuperar datos del backend (funciones GET)

  Formato:
    get_object_modifiers
    object: class, activity, DTO in the back
    modifiers: all, byActivityID, listados en swagger

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

  get_Classes_ByActId(id) {
    return axios.get(
      process.env.REACT_APP_API_URL + "/available-class/by-activity-id/" + id
    );
  }

  /* Devuelve la cantidad de reservas hechas a una clase especifica */
  get_reservation_atendeesAmount(classID) {
    return axios
      .get(
        process.env.REACT_APP_API_URL +
          "/reservation/attendee-amount-by-available-class/" +
          classID
      )
      .then((response) => {
        return response.data.attendeeAmount;
      });
  }

  getProfessorList() {
    return axios
      .get(process.env.REACT_APP_API_URL + "/management/role/all")
      .then((response) => {
        const roles = response.data;
        const rol_prof = roles.find((rol) => {
          return rol.name == "ROLE_PROFESSOR";
        });
        console.log(rol_prof.id);
        return axios
          .get(
            process.env.REACT_APP_API_URL + "/user/users-by-role/" + rol_prof.id
          )
          .then((response) => {
            console.log(response.data);
            return response.data;
          });
      });
  }

  get_ClassesList() {
    return axios.get(process.env.REACT_APP_API_URL + "/available-class/all");
  }
}

export default new UserService();
