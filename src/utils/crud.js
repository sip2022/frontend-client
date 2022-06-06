// FUNCIONES AXIOS
import axios from "axios";
import authHeader from "../services/auth-Header";
import userService from "../services/user.service";
import { backAPI } from "./globalVars";

/*

  Este archivo contiene funciones dedicadas a modificar datos del bakcend:
  funciones POST, PUT y DELETE

  TODO
  Las funciones NO DEBEN devolver un mensaje de error, solo el axios. El componente o funcion que lo llame debe encargarse de eso.

*/

// -------------------- Usuario --------------------
export async function register(input) {
  var result = {
    newUserData: null,
    message: "",
  };
  try {
    const response = await axios
      .post(backAPI + "/register", {
        ...input,
      })
      .then((response) => {
        result.newUserData = response.data;
      });
  } catch (error) {
    if (error.response) {
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
      .post(backAPI + "/login", {
        ...input,
      })
      .then((response) => {
        result = { ...result, accessToken: response.headers.authorization };
      });
  } catch (error) {
    if (error.response) {
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
      .get(backAPI + "/user/email", {
        params: {
          email: email,
        },
        headers: authHeader(),
      })
      .then((response) => {
        console.log(response);
      });
  } catch (error) {
    if (error.response) {
      result.message = error.response.data.message;
    } else {
      console.log(error);
      result.message =
        "Hubo un problema con la obtencion de datos del usuario. Vuelva a intentarlo más tarde.";
    }
  }
  return result;
}

export async function activateUser(id_user) {
  try {
    await axios.put(backAPI + "/user/activate/" + id_user, {
      headers: authHeader(),
    });
  } catch (error) {
    console.log(error);
  }
}

// -------------------- Actividades --------------------
export async function loadActivityList() {
  var result = [];
  try {
    const response = await userService.get_Activity_List().then((response) => {
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
      .post(backAPI + "/activity", {
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
  var result = {
    message: "",
  };
  try {
    const response = await axios.delete(backAPI + "/activity/" + params, {
      headers: authHeader(),
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

export async function actualizarActividad(params) {
  var result = {
    message: "",
  };
  try {
    const response = await axios.put(backAPI + "/activity/" + params, {
      headers: authHeader(),
      body: params,
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
    timeslot: {},
  };
  try {
    const response = await axios

      .post(backAPI + "/timeslot", {
        // headers: authHeader(),
        ...params,
      })
      .then((response) => {
        result.timeslot = response.data;
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

export async function eliminarTimeslot(params) {
  var result = {
    message: "",
  };
  try {
    const response = await axios.delete(backAPI + "/timeslot/" + params, {
      headers: authHeader(),
    });
  } catch (error) {
    console.log(error);
    if (error.response) {
      result.message = error.response.data.message;
    } else {
      result.message =
        "Hubo un problema al borrar el timeslot. Vuelva a intentarlo más tarde.";
    }
  }
  return result;
}

export async function updateTimeslot(params) {
  var result = {
    message: "",
    editedTime: null,
  };
  try {
    const response = await axios
      .put(backAPI + "/timeslot/" + params.id, {
        headers: authHeader(),
        ...params,
      })
      .then((response) => {
        result.editedTime = response.data;
      });
  } catch (error) {
    console.log(error);
    if (error.response) {
      result.message = error.response.data.message;
    } else {
      result.message =
        "Hubo un problema al borrar el timeslot. Vuelva a intentarlo más tarde.";
    }
  }
  return result;
}

// -------------------- END Timeslots --------------------

// -------------------- Profesores --------------------
export async function loadProfessors() {
  var result = [];
  try {
    const response = await userService.getProfessorList().then((response) => {
      result = response;
    });
  } catch (error) {
    console.log(error);
  }
  return result;
}
// -------------------- END Porfesores --------------------

// -------------------- Clases --------------------
export async function agregarClase(params) {
  var result = {
    message: "",
  };
  try {
    const response = axios.post(backAPI + "/available-class", {
      // headers: authHeader(),
      ...params,
    });
  } catch (error) {
    console.log(error);
    if (error.response) {
      result.message = error.response.data.message;
    } else {
      result.message = "Hubo un problema. Vuelva a intentarlo más tarde.";
    }
  }
  return result;
}

export async function loadClassList() {
  var result = {
    message: "",
    classes: [],
  };
  try {
    const response = await userService.get_ClassesList().then((response) => {
      result.classes = response.data;
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

export async function eliminarClass(id_clas) {
  var result = {
    message: "",
  };
  try {
    const response = await axios.delete(
      backAPI + "/available-class/" + id_clas,
      {
        headers: authHeader(),
      }
    );
  } catch (error) {
    console.log(error);
    if (error.response) {
      result.message = error.response.data.message;
    } else {
      result.message =
        "Hubo un problema al borrar el timeslot. Vuelva a intentarlo más tarde.";
    }
  }
  return result;
}

export async function update_class(params) {
  var result = {
    message: "",
    editedClass: null,
  };
  try {
    const response = await axios
      .put(backAPI + "/available-class", {
        headers: authHeader(),
        ...params,
      })
      .then((response) => {
        result.editedTime = response.data;
      });
  } catch (error) {
    console.log(error);
    if (error.response) {
      result.message = error.response.data.message;
    } else {
      result.message =
        "Hubo un problema al editar la clase. Vuelva a intentarlo más tarde.";
    }
  }
  return result;
}
// -------------------- END Clases --------------------

// -------------------- Reservas --------------------
export async function reservar_Clase(classID, atendeeID) {
  return await axios
    .post(backAPI + "/reservation", {
      availableClassId: classID,
      attendeeId: atendeeID,
    })
    .then((response) => {
      return response.data;
    });
}

export async function cancelar_reserva(id_clas, id_user) {
  return axios.put(
    backAPI +
      "/reservation/remove-user/" +
      id_user +
      "/from-available-class/" +
      id_clas
  );
}
// -------------------- END Reservas --------------------

// -------------------- Planes --------------------

export async function suscribir_Plan(
  id_user,
  id_plan,
  nombrePlan,
  cantidadMeses
) {
  const date = new Date().toISOString().substring(0, 10);
  return await axios.post(backAPI + "/subscription", {
    description: nombrePlan + " plan",
    startDate: date,
    monthsToAdd: cantidadMeses,
    planId: id_plan,
    userId: id_user,
  });
}

// -------------------- END Planes --------------------

// -------------------- Pagos --------------------

export async function checkPaySuscription(params) {
  return await axios
}

// -------------------- END Pagos --------------------
