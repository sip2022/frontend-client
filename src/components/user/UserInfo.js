import classes from "./UserInfo.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function UserInfo(props) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [age, setAge] = useState(0);
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
    const now = new Date();
    const age = now.getFullYear() - user.birthDate[0];
    setAge(age);
  }, []);

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
          <p>DNI: {user.dni}</p>
          <p>Telefono: {user.phone}</p>
          <p>Mail: {user.email}</p>
          <p>Edad: {age}</p>
        </section>
      </section>
      <section className={classes.userEdit}>
        <button onClick={editDatosHandler}>Editar Datos</button>
        {/* TODO <button onClick={editPassHandler}>Cambiar Contraseña</button> */}
        <button onClick={volverHandler}>Volver</button>
      </section>
    </section>
  );
}

export default UserInfo;
