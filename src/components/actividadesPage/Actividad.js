import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { set_ActivityLista } from "../../store/slices/activityList/activityListSlice";
import { set_ClassLista } from "../../store/slices/classesList/classesListSlice";
import { loadActivityList, loadClassList } from "../../utils/crud";
import classes from "./Actividad.module.css";

function Actividad(props) {
  const { id_act } = useParams();
  const dispatch = useDispatch();

  const actividades = useSelector((state) => state.activityList.activityList);
  const clases = useSelector((state) => state.classList.classList);

  const [availableClasses, setAvailableClasses] = useState(null);
  const [{ id, name, attendeesLimit, basePrice, professor }, setContenido] =
    useState({
      id: "",
      name: "",
      attendeesLimit: "",
      basePrice: 0,
      professor: {},
    });

  useEffect(() => {
    // TODO funcion loadClases
    async function loadClases() {
      try {
        if (!clases) {
          var lista = await loadClassList();
          return lista;
        } else {
          throw "Exception";
        }
      } catch (error) {
        throw new Error("Clases already loaded");
      }
    }

    loadClases()
      .then((data) => {
        dispatch(set_ClassLista(data.classes));
      })
      .catch((error) => {
        // Nothing
      });

    if (clases && actividades) {
      const av_Classes = clases.filter((clas) => clas.activityDto.id == id_act);
      setAvailableClasses(av_Classes);
      const actividadElegida = actividades.find((act) => {
        return act.id == id_act;
      });
      setContenido(actividadElegida);
    }
  }, [clases, actividades]);

  function reservarHandler(event) {
    const act_sect = document.getElementById("actividad_section");
    console.log(act_sect);
    // act_sect.insertAdjacentElement("afterend", <DisplayReserva />)
  }

  return (
    <section className={classes.actividad_section} id="actividad_section">
      <section>
        <h1>{name}</h1>
      </section>
      <section>
        <h2>Horarios</h2>
        {availableClasses &&
          availableClasses.map((clas, index) => {
            const time = clas.timeslotDto;
            return (
              <section key={index}>
                <input type="radio" name="horario" id={"horario_" + index} />
                <label htmlFor={"horario" + index}>
                  {time.dayOfWeek +
                    ": " +
                    time.startTime[0] +
                    ":" +
                    time.startTime[1] +
                    " - " +
                    time.endTime[0] +
                    ":" +
                    time.endTime[1]}
                </label>
              </section>
            );
          })}
      </section>
      <section>
        <button onClick={reservarHandler}>Reservar</button>
      </section>
    </section>
  );
}

export default Actividad;

function DisplayReserva(props) {
  return (
    <section className={classes.reserva_Section}>
      <section className={classes.reserva_Display}>
        <h1>¿Reservar?</h1>
      </section>
    </section>
  );
}
