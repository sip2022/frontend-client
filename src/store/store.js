import { configureStore } from "@reduxjs/toolkit";

// Slices -> cada slice contiene reducers para un aspecto de la app
import userDataSlice from "./slices/userData/userDataSlice.js";
import activityListSlice from "./slices/activityList/activityListSlice.js";
import infoAppSlice from "./slices/infoApp/infoAppSlice.js";
import planListSlice from "./slices/planList/planListSlice.js";
import usersListSlice from "./slices/usersList/usersListSlice.js";
import professorsListSlice from "./slices/professorsList/professorsListSlice.js";
import timeslotListSlice from "./slices/timeslotList/timeslotListSlice.js";
import classesListSlice from "./slices/classesList/classesListSlice.js";

export const store = configureStore({
  // En reducer se colocan los recurser de los slices
  reducer: {
    // nombre del estado para los compoenentes : el lsice del que lo toma
    user: userDataSlice,
    userList: usersListSlice,
    professorsList: professorsListSlice,
    activityList: activityListSlice,
    info: infoAppSlice,
    planList: planListSlice,
    timeslotList: timeslotListSlice,
    classList: classesListSlice
  },
});
