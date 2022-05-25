import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { set_ActivityLista } from "../../store/slices/activityList/activityListSlice";
import { loadActivityList } from "../../utils/crud";
import classes from "./Actividad.module.css";

function Actividad(props) {
  const { id_time } = useParams();
  const dispatch = useDispatch();
  const actividades = useSelector((state) => state.activityList.activityList);
  const [{ id, name, horarios, profesor, attendeesLimit, basePrice }, setContenido] =
    useState({
      id: "",
      name: "",
      profesor: {},
      attendeesLimit: "",
      basePrice: 0
    });

  useEffect(() => {
    // TODO funcion loadActividades
    async function loadActividades() {
      try {
        if (!actividades) {
          var lista = await loadActivityList();
          return lista;
        } else {
          throw "Exception";
        }
      } catch (error) {
        throw new Error("Actividades already loaded");
      }
    }
    loadActividades()
      .then((data) => {
        dispatch(set_ActivityLista(data));
      })
      .catch((error) => {
        // Nothing
      });

    const act = actividades.find((act) => {
      return act.id == id_time;
    });
    setContenido({...act});
  }, []);

  return (
    <section>
      <p>{id}</p>
      <section className={classes.actividadDatos}>
        <section>
          <h2>{name}</h2>
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
