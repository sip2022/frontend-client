import classes from "./UserInfo.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function UserInfo(props) {

  const userInfo = useSelector((state) => state.user)
  const navigate = useNavigate()
  const [{ nombre, apellido, dni, telefono, mail, edad, imagen }, setDatos] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    mail: "",
    edad: "",
    imagen: ""
  });

  useEffect(() => {
    // TODO get info del estado del usuario
    // if(usuario no está logueado)
    //   navigate("/login", { replace: true });
    console.log(userInfo);
    setDatos({
      nombre: "Seba",
      apellido: "Marchetti",
      dni: "12345678",
      telefono: "2323-232323",
      mail: "seba@gmail.com",
      edad: "23",
    });
  }, []);

  function editDatosHandler(event) {
    event.preventDefault();
    navigate("/user/info/change", { replace: true });
  }

  function editPassHandler(event) {
    event.preventDefault();
    navigate("/user/info/pass", { replace: true });
  }

  return (
    <section className={classes.userSection}>
      {/* <section className={classes.userImage}>
        <img src="/images/user_images/UserMockImage.jpeg" />
      </section> */}
      <section className={classes.userInfo}>
        <h1 className={classes.UserName}>{nombre + " " + apellido}</h1>
        <section>
          <p>DNI: {dni}</p>
          <p>Telefono: {telefono}</p>
          <p>Mail: {mail}</p>
          <p>Edad: {edad}</p>
        </section>
      </section>
      <section className={classes.userEdit}>
        <button onClick={editDatosHandler}>Editar Datos</button>
        <button onClick={editPassHandler}>Cambiar Contraseña</button>
      </section>
    </section>
  );
}

export default UserInfo;
