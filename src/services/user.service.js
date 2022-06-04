import axios from "axios";
import { backAPI } from "../utils/globalVars";
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

  get_User_ById(id_user) {
    return axios
      .get(backAPI + "/user/" + id_user, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }

  get_User_List() {
    return axios
      .get(backAPI + "/user/all", {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }

  get_User_Turnos() {
    return axios
      .get(backAPI + "/user/all", {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }

  get_Activity_List() {
    return axios
      .get(backAPI + "/activity/all")
      .then((response) => {
        return response.data;
      });
  }

  get_Timeslot_List() {
    return axios
      .get(backAPI + "/timeslot/available-and-ordered")
      .then((response) => {
        return response.data;
      });
  }

  get_Planes_List() {
    return axios
      .get(backAPI + "/plan/all")
      .then((response) => {
        return response.data;
      });
  }

  get_Class_List() {
    return axios
      .get(backAPI + "/available-class/all")
      .then((response) => {
        return response.data;
      });
  }

  get_Classes_ByActId(id) {
    return axios
      .get(
        backAPI + "/available-class/by-activity-id/" + id
      )
      .then((response) => {
        return response.data;
      });
  }

  /* Devuelve la cantidad de reservas hechas a una clase especifica */
  get_reservation_atendeesAmount(classID) {
    return axios
      .get(
        backAPI +
          "/reservation/attendee-amount-by-available-class/" +
          classID
      )
      .then((response) => {
        return response.data.attendeeAmount;
      });
  }

  get_Professor_List() {
    return axios
      .get(backAPI + "/management/role/all")
      .then((response) => {
        const roles = response.data;
        const rol_prof = roles.find((rol) => {
          return rol.name == "ROLE_PROFESSOR";
        });
        return axios
          .get(
            backAPI + "/user/users-by-role/" + rol_prof.id
          )
          .then((response) => {
            return response.data;
          });
      });
  }

  get_Turnos_ByUserId(id_user) {
    return axios
      .get(
        backAPI + "/reservation/from-user/" + id_user
      )
      .then((response) => {
        return response.data;
      });
  }

  get_Subscriptions_ByUserId(id_user) {
    return axios
      .get(
        backAPI + "/subscription/from-user/" + id_user
      )
      .then((response) => {
        return response.data;
      });
  }
}

export default new UserService();
