import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./Actividad.module.css";

// TODO conseguir esta actividad con el id, con un ajax o buscandolo en el redux
const DUMMY_DATA = {
  nombre: "Zumba",
  imagen: "/images/actividades_images/activityCardImage.jpg",
  horarios: ["Horario 1", "Horario 2"],
  precioBase: 0,
  profesor: "",
};

function Actividad(props) {
  const { id } = useParams();
  const actividad = DUMMY_DATA;
  const [{ nombre, horarios, precioBase, profesor, imagen }, setContenido] =
    useState({
      nombre: "",
      horarios: [],
      precioBase: "",
      profesor: "",
    });

  useEffect(() => {
    // TODO ajax fetch to get actividad.id = id
    // Alternativa .------> buscarlo en el redux de lista de actividades
    // setContenido(...)
    setContenido(DUMMY_DATA);
  }, []);

  return (
    <section>
      <section className={classes.actividadDatos}>
        <section>
          <h2>{nombre}</h2>
        </section>
        <section>
          {horarios
            ? horarios.map((horario, index) => {
                return horario;
              })
            : null}
        </section>
      </section>
      <section className={classes.actividadImagen}>
        <img src={imagen} />
      </section>
    </section>
  );
}

export default Actividad;
