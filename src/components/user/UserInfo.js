import classes from "./UserInfo.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isRejected } from "@reduxjs/toolkit";

function UserInfo(props) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [age, setAge] = useState(null);
  const [{ nombre, apellido, dni, telefono, mail, edad, imagen }, setDatos] =
    useState({
      nombre: "",
      apellido: "",
      dni: "",
      telefono: "",
      mail: "",
      edad: "",
      imagen: "",
    });

  useEffect(() => {
    if (!user.id) navigate("/login", { replace: true });
    // TODO get info del estado del usuario
    // if(usuario no está logueado)
    //   navigate("/login", { replace: true });
    if (user.birthDate) {
      const now = new Date();
      const age = now.getFullYear() - user.birthDate[0];
      setAge(age);
    }
  }, [user.id]);

  function editDatosHandler(event) {
    event.preventDefault();
    navigate("/user/info/change", { replace: true });
  }

  function editPassHandler(event) {
    event.preventDefault();
    navigate("/user/info/pass", { replace: true });
  }

  function volverHandler() {
    navigate("/user", { replace: true });
  }

  return (
    <section className={classes.userSection}>
      <section className={classes.userInfo}>
        <h1 className={classes.UserName}>
          {user.firstName + " " + user.lastName}
        </h1>
        <section>
          {user.dni && <p>DNI: {user.dni}</p>}
          {user.phone && <p>Telefono: {user.phone}</p>}
          {user.email && <p>Mail: {user.email}</p>}
          {age && <p>Edad: {age}</p>}
        </section>
      </section>
      <section className={classes.userEdit}>
        <button onClick={editDatosHandler} className={classes.boton}>
          Editar Datos
        </button>
        {/* TODO <button onClick={editPassHandler}>Cambiar Contraseña</button> */}
        <button onClick={volverHandler} className={classes.boton}>
          Volver
        </button>
      </section>
    </section>
  );
}

export default UserInfo;
