// FUNCIONES AXIOS
import axios from "axios";
import authHeader from "../services/auth-Header";

export async function register(input) {
  var result = {
    message: "",
  };
  try {
    const response = await axios.post(
      // process.env.REACT_APP_API_URL + "/register",
      "http://34.75.33.30:80/register",
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
      id: 2,
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

export async function agregarActividad(actividad) {
  var result = {
    message: "",
  };
  try {
    const response = await axios
      .post(process.env.REACT_APP_API_URL + "/activity", {
        ...actividad,
      })
      .then((response) => {
        console.log(response.log);
        result = { ...result, ...response.data };
      });
  } catch (error) {
    if (error.response) {
      result.message = error.response.data.message;
    } else {
      result.message = "Hubo un problema. Vuelva a intentarlo más tarde.";
    }
  }
  return result;
}

export async function eliminarActividad(params) {
  console.log(params);
  var result = {
    message: "",
  };
  try {
    const response = await axios.delete(
      process.env.REACT_APP_API_URL + "/activity/" + params,
      {
        headers: authHeader(),
      }
    );
  } catch (error) {
    if (error.response) {
      result.message = error.response.data.message;
    } else {
      result.message = "Hubo un problema. Vuelva a intentarlo más tarde.";
    }
  }
  return result;
}

export async function actualizarActividad(params) {
  console.log(params);
  var result = {
    message: "",
  };
  try {
    const response = await axios.put(
      process.env.REACT_APP_API_URL + "/activity/" + params,
      {
        headers: authHeader(),
        body: params,
      }
    );
  } catch (error) {
    if (error.response) {
      result.message = error.response.data.message;
    } else {
      result.message = "Hubo un problema. Vuelva a intentarlo más tarde.";
    }
  }
  return result;
}

// -------------------- END Actividades --------------------

// -------------------- Timeslots --------------------

export async function getTimeslotList() {
  console.log("Loading timeslots...");
  var result = [];
  try {
    const response = axios
      .get(process.env.REACT_APP_API_URL + "/login")
      .then((response) => {
        console.log(response.data);
        // result = data;
      });

    result = [
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
  } catch (error) {}

  return result;
}

// -------------------- END Timeslots --------------------

// -------------------- Profesores --------------------
export async function getProfesoresList() {
  console.log("Loading Profesores...");
  const DUMMY_DATA = [
    // Profesor Mock
    {
      id: "8e7b5a76-0ee6-4645-9f19-76eb4e7b4c2a",
      dni: 123987,
      email: "professor@mail.com",
      firstName: null,
      lastName: null,
      birthDate: null,
      phone: null,
      status: "ACTIVE",
      roles: ["ROLE_PROFESSOR"],
    },
    // {
    //   id: 1,
    //   email: "profesor@gmail.com",
    //   dni: 12345678,
    //   phone: 2323,
    //   firstName: "Sindy",
    //   lastName: "Nero",
    //   birthDate: "2000-01-01",
    //   status: "ACTIVE",
    //   roles: ["ROLE_PROFESSOR"],
    // },
  ];
  return DUMMY_DATA;
}
// -------------------- END Porfesores --------------------
