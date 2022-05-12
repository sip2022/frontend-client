import axios from "axios";

export function loadActivityList(state) {
  try {
    if (!state.activityList) {
      // // TODO endpoint para obtener todas las listas
      // const response = await axios.get(process.env.API_URL + "/activityList");
      // console.log(response);
      // const data = response.data;
      // // seteo todo el estado
      // state.activityList = data;
      state.activityList = [
        // Actividad Mock
        {
          id: 1,
          name: "Actividad X",
          basePrice: 3.0,
          professor: "Sindy Nero",
          atendeesLimit: 10,
          appointments: [
            // Timeslots
            {
              startTime: {
                hour: 13,
                minute: 30,
              },
              endTime: {
                hour: 14,
                minute: 30,
              },
            },
          ],
        },
        // Actividad Mock
        {
          id: 1,
          name: "Actividad 2",
          basePrice: 3.0,
          professor: "Sindy Nero",
          atendeesLimit: 10,
          appointments: [
            {
              startTime: {
                hour: 13,
                minute: 30,
              },
              endTime: {
                hour: 14,
                minute: 30,
              },
            },
          ],
        },
      ];
    }
  } catch (error) {
    console.log(error);
    return new Error(error);
  }
}
