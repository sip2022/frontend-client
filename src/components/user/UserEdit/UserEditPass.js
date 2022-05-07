import classes from "./UserEditPass.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserEditPass(props) {

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
    setDatos({
      nombre: "Seba",
      apellido: "Marchetti",
      dni: "12345678",
      telefono: "2323-232323",
      mail: "seba@gmail.com",
      edad: "23",
    });
  }, []);

  return (
    <section className={classes.userSection}>
      
    </section>
  );
}

export default UserEditPass;