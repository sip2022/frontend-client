import axios from "axios";

// estas acciones las llama el slice, para añadirlas a su recurder
module.exports = {
  registrarUsuario:
    (state, {payload}) => () => {
      return axios.post(process.env.API_URL + "/register", {
        ...payload,
        phone: parseInt(payload.phone),
        rolesNames: ["USER"],
      });
    },
  // ---------- ---------- ----------
  loginUsuario: (state, {payload}) => () => {
    return axios
      .post(process.env.API_URL + "/login", {
        payload,
      })
      .then((response) => {
        console.log(response);
        const { accesToken, nombre } = response.data;
        // seteo todo el estado
        state.nombre = nombre;
        // TODO demas campos del estado se actualizan...
        localStorage.setItem("user", accesToken);
      })
      .catch((error) => {
        console.log(error);
        return new Error(error);
      });
  },
};