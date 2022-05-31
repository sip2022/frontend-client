import classes from "./UserEditInfo.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function EditSection(props) {
  return <section className={classes.editItem}>
    <label htmlFor={"input_" + props.name}>{props.name}</label>
    <input type="text" {...props}/>
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

  const userInfo = useSelector((state) => state.user)

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
  
  function handleChange({name, value}) {
    console.log(name + ":" + value);
    setDatos((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section className={classes.editSection}>
      <h2>Editar Perfil</h2>
      {/* TODO Refactor Datos.map no funciona */}
      <section className={classes.editItems}>
        <EditSection name="nombre" value={datos.nombre} onChange={(e) => handleChange(e.target)}/>
        <EditSection name="apellido" value={datos.apellido} onChange={(e) => handleChange(e.target)}/>
        <EditSection name="dni" value={datos.dni} onChange={(e) => handleChange(e.target)}/>
        <EditSection name="telefono" value={datos.telefono} onChange={(e) => handleChange(e.target)}/>
        <EditSection name="mail" value={datos.mail} onChange={(e) => handleChange(e.target)}/>
        <EditSection name="edad" value={datos.edad} onChange={(e) => handleChange(e.target)}/>
      </section>
      <section className={classes.editButtons}>
        <button className={classes.btnGuardar} onClick={saveHandler}>Guardar</button>
        <button className={classes.btnCancelar} onClick={cancelarHandler}>Cancelar</button>
      </section>
    </section>
  );
}

export default UserEditInfo;
