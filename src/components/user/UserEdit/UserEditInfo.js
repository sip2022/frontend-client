import classes from "./UserEditInfo.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EditSection({nombre, valor}) {
  return <section className={classes.editItem}>
    <label for={"input_" + nombre}>{nombre}</label>
    <input type="text" value={valor} />
  </section>;
}

function UserEditInfo(props) {
  const navigate = useNavigate();
  const [datos, setDatos] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    mail: "",
    edad: "",
    imagen: "",
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

  function saveHandler(event) {
    event.preventDefault();
    // TODO Guarda los cambios en el back, espera la respuesta. 
    // Ponerlo en un estado de redux, en userDataSlice
    alert("Nuevos datos guardados")
  }

  function cancelarHandler(event) {
    event.preventDefault();
    navigate("/user/info", { replace: true });
  }

  return (
    <section className={classes.editSection}>
      <h2>Editar Perfil</h2>
      {/* TODO Refactor Datos.map no funciona */}
      <section className={classes.editItems}>
        <EditSection nombre="Nombre" valor={datos.nombre} />
        <EditSection nombre="Apellido" valor={datos.apellido} />
        <EditSection nombre="DNI" valor={datos.dni} />
        <EditSection nombre="Telefono" valor={datos.telefono} />
        <EditSection nombre="Mail" valor={datos.mail} />
        <EditSection nombre="Edad" valor={datos.edad} />
      </section>
      <section className={classes.editButtons}>
        <button className={classes.btnGuardar} onClick={saveHandler}>Guardar</button>
        <button className={classes.btnCancelar} onClick={cancelarHandler}>Cancelar</button>
      </section>
    </section>
  );
}

export default UserEditInfo;
