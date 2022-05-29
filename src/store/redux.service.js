import { store } from "./store";
/*
  example of accessing the store:
  store.getState().classList.classList
*/

// Recupera una actividad del estado, segun ID
export function getActividadRedux(id_act) {
  const actividades = store.getState().activityList.activityList;
  if(actividades){
    return actividades.find((act) => {
      return act.id == id_act;
    });
  }
  return null;
}

// Recupera una clase del estado, segun ID
export function getClaseRedux(id_clas) {
  const clases = store.getState().classList.classList;
  if(clases){
    return clases.find((clas) => {
      return clas.id == id_clas;
    });
  }
  return null;
}

// Recupera una horario del estado, segun ID
export function getHorarioRedux(id_hor) {
  const horarios = store.getState().timeslotList.timeslotList;
  if(horarios){
    return horarios.find((hor) => {
      return hor.id == id_hor;
    });
  }
  return null;
}

// Recupera un profesor del estado, segun ID
export function getProfesorRedux(id_prof) {
  const profesores = store.getState().professorsList.professorsList;
  if(profesores){
    return profesores.find((prof) => {
      return prof.id == id_prof;
    });
  }
  return null;
}

