// FUNCIONES AXIOS
import axios from "axios";
import authHeader from "../services/auth-Header";

export async function register(input) {
  var result = {
    message: "",
  };
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/register",
      {
        ...input,
      }
    );
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.message);
      result.message = error.response.data.message;
    } else {
      result.message =
        "Hubo un problema con el Registro. Vuelva a intentarlo más tarde.";
    }
  }
  return result;
}

export async function login(input) {
  var result = {
    message: "",
  };
  try {
    const response = await axios
      .post(process.env.REACT_APP_API_URL + "/login", {
        ...input,
      })
      .then((response) => {
        console.log(response.data);
        console.log(response.headers);
        console.log("Logueado");
        result = { ...result, ...response.data };
      });
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.message);
      result.message = error.response.data.message;
    } else {
      result.message =
        "Hubo un problema con el Login. Vuelva a intentarlo más tarde.";
    }
  }
  return result;
}

export async function getUser(token) {
  // TODO necesito el endpoint
  const response = await axios.get(process.env.REACT_APP_API_URL + "/", {});
}

// -------------------- Actividades --------------------
export async function loadActivityList() {
  console.log("Loading actividades...");
  const DUMMY_DATA = [
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
          dayOfWeek: "Monday",
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
  // TODO Axios para recuperar lista de actividades, con authHeader

  return DUMMY_DATA;
}

// -------------------- END Actividades --------------------

// -------------------- Timeslots --------------------

export async function getTimeslotList() {
  console.log("Loading timeslots...");
  const DUMMY_DATA = [
    // Timeslot Mock
    {
      dayOfWeek: "Monday",
      startTime: {
        hour: 13,
        minute: 30,
      },
      endTime: {
        hour: 14,
        minute: 30,
      },
    },
  ];
  return DUMMY_DATA;
}

// -------------------- END Timeslots --------------------


// -------------------- Profesores --------------------
export async function getProfesoresList() {
  console.log("Loading Profesores...");
  const DUMMY_DATA = [
    // Profesor Mock
    {
      id: 1,
      email: "profesor@gmail.com",
      dni: 12345678,
      phone: 2323,
      firstName: "Sindy",
      lastName: "Nero",
      age: 28,
    },
    {
      id: 2,
      email: "profesor2@gmail.com",
      dni: 12345679,
      phone: 2324,
      firstName: "Josue",
      lastName: "Yrion",
      age: 35,
    },
  ];
  return DUMMY_DATA;
}
// -------------------- END Porfesores --------------------