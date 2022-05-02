import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./Actividad.module.css";

function Actividad(props) {
  const { id } = useParams();
  const [{ nombre, horarios, precioBase, profesor }, setContenido] = useState({
    // nombre: "",
    // horarios: [],
    // precioBase: "",
    // profesor: "",
    nombre: "Boxeo",
    horarios: [],
    precioBase: "",
    profesor: "Profesor X",
  });

  useEffect(() => {
    // TODO ajax fetch to get actividad.id = id
    // Alternativa .------> buscarlo en el redux de lista de actividades
    // setContenido(...)
  }, []);

  return (
    <section>
      <section className={classes.actividadDatos}>
        <h2>{nombre}</h2>
        <section>
          {horarios
            ? horarios.map((horario, index) => {
                return horario;
              })
            : null}
        </section>
      </section>
    </section>
  );
}

export default Actividad;
