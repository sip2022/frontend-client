// FUNCIONES AXIOS
import axios from "axios";
import authHeader from "../services/auth-Header";
import userService from "../services/user.service";

// -------------------- Usuario --------------------
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
        console.log(response.headers.authorization);
        result = { ...result, accessToken: response.headers.authorization };
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

export async function getUser(email) {
  var result = {
    message: "",
  };
  try {
    const response = await axios
      .get(process.env.REACT_APP_API_URL + "/user/email", {
        params: {
          email: email,
        },
        headers: authHeader(),
      })
      .then((response) => {
        console.log("Datos del usuario conseguidos");
        console.log(response);
      });
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.message);
      result.message = error.response.data.message;
    } else {
      console.log(error);
      result.message =
        "Hubo un problema con la obtencion de datos del usuario. Vuelva a intentarlo más tarde.";
    }
  }
  return result;
}

// -------------------- Actividades --------------------
export async function loadActivityList() {
  var result = [];
  try {
    const response = await userService.getActivityList().then((response) => {
      result = response.data;
    });
  } catch (error) {
    console.log(error);
  }
  return result;
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

export async function loadTimeslotList() {
  var result = [];
  try {
    const response = await userService.getTimeslotList().then((response) => {
      result = response.data;
    });
  } catch (error) {
    console.log(error);
  }
  return result;
}

export async function agregarTimeslot(params) {
  var result = {
    message: "",
    timeslot: {}
  };
  try {
    const response = await axios
      .post(process.env.REACT_APP_API_URL + "/timeslot", {
        // headers: authHeader(),
        ...params,
      })
      .then((response) => {
        console.log(response.data);
        result.timeslot = response.data;
      });
  } catch (error) {
    if (error.response) {
      console.log("Error response");
      result.message = error.response.data.message;
    } else {
      result.message = "Hubo un problema. Vuelva a intentarlo más tarde.";
    }
  }
  console.log("que será");
  return result;
}

export async function eliminarTimeslot(params) {
  var result = {
    message: "",
  };
  try {
    const response = await axios.delete(
      process.env.REACT_APP_API_URL + "/timeslot/" + params,
      {
        headers: authHeader(),
      }
    );
  } catch (error) {
    if (error.response) {
      result.message = error.response.data.message;
    } else {
      result.message = "Hubo un problema al borrar el timeslot. Vuelva a intentarlo más tarde.";
    }
  }
  return result;
}

// -------------------- END Timeslots --------------------

// -------------------- Profesores --------------------
export async function loadProfessors() {
  // var result = [];
  // try {
  //   const response = await userService.getProfessorList().then((response) => {
  //     result = response.data;
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
  // return result;
  return userService.getProfessorList();
}
// -------------------- END Porfesores --------------------

// -------------------- Clases --------------------
export async function agregarClase(params) {
  console.log(params);
  var result = {
    message: "",
  };
  try {
    const response = axios
      .post(process.env.REACT_APP_API_URL + "/available-class", {
        // headers: authHeader(),
        ...params,
      })
      .then((response) => {
        console.log(response);
      });
  } catch (error) {
    if (error.response) {
      console.log("Error response");
      result.message = error.response.data.message;
    } else {
      result.message = "Hubo un problema. Vuelva a intentarlo más tarde.";
    }
  }
  return result;
}
// -------------------- END Clases --------------------
