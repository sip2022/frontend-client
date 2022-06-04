import classes from "./UserEditInfo.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function UserEditInfo(props) {
  const navigate = useNavigate();
  const [datos, setDatos] = useState({
    firstName: "",
    lastName: "",
    dni: "",
    phone: "",
    email: "",
    birthDate: "",
  });

  const user = useSelector((state) => state.user);

  useEffect(() => {
    // TODO get info del estado del usuario
    // if(usuario no está logueado)
    //   navigate("/login", { replace: true });
    setDatos({
      ...user
    });
  }, []);

  function saveHandler(event) {
    event.preventDefault();
    // TODO Guarda los cambios en el back, espera la respuesta.
    // Ponerlo en un estado de redux, en userDataSlice
  }

  function cancelarHandler(event) {
    event.preventDefault();
    navigate("/user/info", { replace: true });
  }

  function handleChange({ name, value }) {
    setDatos((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <section className={classes.editSection}>
      <h2>Editar Perfil</h2>
      {/* TODO Refactor Datos.map no funciona */}
      <section className={classes.editItems}>
        <EditSection
          name="firstName"
          type="text"
          value={datos.firstName}
          onChange={(e) => handleChange(e.target)}
        />
        <EditSection
          name="lastName"
          type="text"
          value={datos.lastName}
          onChange={(e) => handleChange(e.target)}
        />
        <EditSection
          name="dni"
          type="text"
          value={datos.dni}
          onChange={(e) => handleChange(e.target)}
        />
        <EditSection
          name="phone"
          type="text"
          value={datos.phone}
          onChange={(e) => handleChange(e.target)}
        />
        <EditSection
          name="email"
          type="text"
          value={datos.email}
          onChange={(e) => handleChange(e.target)}
        />
        <EditSection
          name="birthDate"
          type="date"
          value={datos.birthDate}
          onChange={(e) => handleChange(e.target)}
        />
      </section>
      <section className={classes.editButtons}>
        <button className={classes.btnGuardar} onClick={saveHandler}>
          Guardar
        </button>
        <button className={classes.btnCancelar} onClick={cancelarHandler}>
          Cancelar
        </button>
      </section>
    </section>
  );
}

export default UserEditInfo;

function EditSection(props) {
  const idInput = "input_" + props.name;
  useEffect(() => {
    document.getElementById(idInput).value = props.value;
  }, []);

  return (
    <section className={classes.editItem}>
      <label htmlFor={"input_" + props.name}>{props.name}</label>
      <input id={idInput} {...props} />
    </section>
  );
}
