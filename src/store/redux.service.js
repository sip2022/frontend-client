import { store } from "./store";
/*
  example of accessing the store:
  store.getState().classList.classList
*/

class ReduxService {
  // Recupera una actividad del estado, segun ID
  get_Actividad_byID(id_act) {
    const actividades = store.getState().activityList.activityList;
    if (actividades) {
      return actividades.find((act) => {
        return act.id == id_act;
      });
    }
    return null;
  }

  // Recupera una clase del estado, segun ID
  get_Class_byID(id_clas) {
    const clases = store.getState().classList.classList;
    if (clases) {
      return clases.find((clas) => {
        return clas.id == id_clas;
      });
    }
    return null;
  }

  // Devuelve true si la clase fue reservada por el suuario
  check_Class_ofUser_byClassID(id_Class) {
    const user = store.getState().user;
    console.log(user.turnos);
    var flag = false;
    user.turnos.map((turno) => {
      if (turno.availableClass.id == id_Class) flag = true;
    });
    return flag;
  }

  // Recupera una horario del estado, segun ID
  get_Horario_byID(id_hor) {
    const horarios = store.getState().timeslotList.timeslotList;
    if (horarios) {
      return horarios.find((hor) => {
        return hor.id == id_hor;
      });
    }
    return null;
  }

  // Recupera un profesor del estado, segun ID
  get_Profesor_byID(id_prof) {
    const profesores = store.getState().professorsList.professorsList;
    if (profesores) {
      return profesores.find((prof) => {
        return prof.id == id_prof;
      });
    }
    return null;
  }

  // Recupera un plan del estado, segun ID
  get_Plan_byID(id_plan) {
    const planes = store.getState().planList.planList;
    if (planes) {
      return planes.find((plan) => {
        return plan.id == id_plan;
      });
    }
    return null;
  }
}

export default new ReduxService();
