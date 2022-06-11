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

  async get_User_ById(id_user) {
    const response = await axios
      .get(backAPI + "/user/" + id_user, {
        headers: authHeader(),
      });
    return response.data;
  }

  async get_User_List() {
    const response = await axios
      .get(backAPI + "/user/all", {
        headers: authHeader(),
      });
    return response.data;
  }

  async get_User_Turnos() {
    const response = await axios
      .get(backAPI + "/user/all", {
        headers: authHeader(),
      });
    return response.data;
  }

  async get_Activity_List() {
    const response = await axios.get(backAPI + "/activity/all");
    return response.data;
  }

  async get_Timeslot_List() {
    const response = await axios
      .get(backAPI + "/timeslot/available-and-ordered");
    return response.data;
  }

  async get_Planes_List() {
    const response = await axios.get(backAPI + "/plan/all");
    return response.data;
  }

  async get_Class_List() {
    const response = await axios.get(backAPI + "/available-class/all");
    return response.data;
  }

  async get_Classes_ByActId(id) {
    const response = await axios
      .get(backAPI + "/available-class/by-activity-id/" + id);
    return response.data;
  }

  /* Devuelve la cantidad de reservas hechas a una clase especifica */
  async get_reservation_atendeesAmount(classID) {
    const response = await axios
      .get(
        backAPI + "/reservation/attendee-amount-by-available-class/" + classID
      );
    return response.data.attendeeAmount;
  }

  async get_Professor_List() {
    const response = await axios.get(backAPI + "/management/role/all");
    const roles = response.data;
    const rol_prof = roles.find((rol) => {
      return rol.name == "ROLE_PROFESSOR";
    });
    const response_1 = await axios
      .get(backAPI + "/user/users-by-role/" + rol_prof.id);
    return response_1.data;
  }

  async get_Turnos_ByUserId(id_user) {
    const response = await axios.get(
      backAPI + "/reservation/from-user/" + id_user
    );
    return response.data;
  }

  async get_Subscriptions_ByUserId(id_user) {
    const response = await axios
      .get(backAPI + "/subscription/from-user/" + id_user);
    return response.data;
  }

  async get_Roles_List() {
    const response = await axios.get(backAPI + "/management/role/all");
    return response.data;
  }

  async get_Pagos_ByUserId(id_user){
    const response = await axios.get(backAPI + "/payment/from-user/" + id_user);
    return response.data;
  }

  async get_Payment_ById(id_pay){
    const response = await axios.get(backAPI + "/payment/" + id_pay);
    return response.data;
  }


}

export default new UserService();
