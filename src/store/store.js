import { configureStore } from "@reduxjs/toolkit";

// Slices -> cada slice contiene reducers para un aspecto de la app
import userDataSlice from "./slices/userData/userDataSlice.js";

export const store = configureStore({
   
  // En reducer se colocan los recurser de los slices
  reducer: {
    // nombre del estado para los compoenentes : el lsice del que lo toma
    user: userDataSlice,
    // info : infoSlice
  }
})




