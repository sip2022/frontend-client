import axios from "axios";
import authHeader from "./auth-Header";

/* 

  Esta clase contiene funciones para recuperar datos del backend (funciones GET)

  Formato:
    get_object_modifiers
    object: class, activity, DTO in the back
    modifiers: all, byActivityID, listados en swagger

*/
class UserService {
  // Axios GET calls

  get_User_List() {
    return axios
      .get(process.env.REACT_APP_API_URL + "/user/all", {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }

  get_User_Turnos() {
    return axios
      .get(process.env.REACT_APP_API_URL + "/user/all", {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }

  get_Activity_List() {
    return axios
      .get(process.env.REACT_APP_API_URL + "/activity/all")
      .then((response) => {
        return response.data;
      });
  }

  get_Timeslot_List() {
    return axios
      .get(process.env.REACT_APP_API_URL + "/timeslot/available-and-ordered")
      .then((response) => {
        return response.data;
      });
  }

  get_Planes_List() {
    return axios
      .get(process.env.REACT_APP_API_URL + "/plan/all")
      .then((response) => {
        return response.data;
      });
  }

  get_Class_List() {
    return axios
      .get(process.env.REACT_APP_API_URL + "/available-class/all")
      .then((response) => {
        return response.data;
      });
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

  get_Professor_List() {
    return axios
      .get(process.env.REACT_APP_API_URL + "/management/role/all")
      .then((response) => {
        const roles = response.data;
        const rol_prof = roles.find((rol) => {
          return rol.name == "ROLE_PROFESSOR";
        });
        return axios
          .get(
            process.env.REACT_APP_API_URL + "/user/users-by-role/" + rol_prof.id
          )
          .then((response) => {
            return response.data;
          });
      });
  }
}

export default new UserService();
