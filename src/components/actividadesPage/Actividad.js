import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import userService from "../../services/user.service";
import { set_ActivityLista } from "../../store/slices/activityList/activityListSlice";
import { set_ClassLista } from "../../store/slices/classesList/classesListSlice";
import { loadActivityList, loadClassList } from "../../utils/crud";
import classes from "./Actividad.module.css";

function Actividad(props) {
  const { id_act } = useParams();
  const dispatch = useDispatch();

  const actividades = useSelector((state) => state.activityList.activityList);
  const [availableClasses, setAvailableClasses] = useState(null);

  const [error, setError] = useState("");
  const [appearReserva, setAppearReserva] = useState(false)

  const [{ id, name, attendeesLimit, basePrice, professor }, setContenido] =
    useState({
      id: "",
      name: "",
      attendeesLimit: "",
      basePrice: 0,
      professor: {},
    });

  useEffect(() => {
    // Obtener los horarios de clases (available-classes) de la actividad (tengo el id)
    userService.getClasses_ByActId(id_act).then((response) => {
      console.log(response.data);
      setAvailableClasses(response.data);
    });
    // Conseguir la actividad elegida (tengo el id)
    const actividadElegida = actividades.find((act) => {
      return act.id == id_act;
    });
    console.log(actividadElegida);
    setContenido(actividadElegida);
  }, [actividades]);

  function clearError() {
    setError("");
  }

  function reservarHandler(event) {
    clearError();

    var ele = document.getElementsByName("horario");
    let hor_selected = null;
    for (let i = 0; i < ele.length; i++) {
      if (ele[i].checked) hor_selected = ele[i];
    }
    if (hor_selected) {
      const id_act_select = hor_selected.getAttribute("id_class");
      const section = document.getElementById("actividad_section");
      setAppearReserva(true)
      // act_sect.insertAdjacentElement("afterend", <DisplayReserva />)
    } else {
      setError(
        "Para reservar la actividad, seleccione uno de los horarios mostrados"
      );
    }
  }

  function exampleHandler() {
    setAppearReserva(false);
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
                <input
                  type="radio"
                  name="horario"
                  id={"horario_" + index}
                  id_class={clas.id}
                />
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
      {appearReserva && <DisplayReserva callback={exampleHandler} />}
      {error && <section>{error}</section>}
    </section>
  );
}

export default Actividad;

function DisplayReserva({ callback }) {

  useEffect(()=>{
    console.log("Hola");
  }, [])

  function cancelHandler(params) {

  }

  return (
    <section className={classes.reserva_Section}>
      <section className={classes.reserva_Display}>
        <h2>¿Reservar?</h2>
        <button onClick={callback}>
          Aceptar
        </button>
      </section>
    </section>
  );
}
