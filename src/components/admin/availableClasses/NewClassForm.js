import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import userService from "../../../services/user.service";
import { set_ActivityLista } from "../../../store/slices/activityList/activityListSlice";
import { set_TimeLista } from "../../../store/slices/timeslotList/timeslotListSlice";
import {
  agregarClase,
  loadActivityList,
  loadTimeslotList,
} from "../../../utils/crud";

function NewClassForm(params) {
  const timeslots = useSelector((state) => state.timeslotList.timeslotList);
  const activities = useSelector((state) => state.activityList.activityList);
  const dispatch = useDispatch();

  useEffect(async () => {
    // TODO esto va en UserService

    async function loadTimeslots() {
      try {
        if (!timeslots) {
          var lista = await loadTimeslotList();
          return lista;
        } else {
          throw "Exception";
        }
      } catch (error) {
        throw new Error("Timeslots already loaded");
      }
    }

    async function loadActividades() {
      try {
        if (!timeslots) {
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

    loadTimeslots()
      .then((data) => {
        dispatch(set_TimeLista(data));
      })
      .catch((error) => {
        // Nothing
      });
  }, []);

  function cancelHandler(event) {
    event.preventDefault();
    // TODO ir a la pantalla anterior
  }

  async function saveHandler(event) {
    event.preventDefault();

    const time_select = document.getElementById("input-timeslot");
    const id_timeslot =
      time_select.options[time_select.selectedIndex].getAttribute("id_time");

    const activity_select = document.getElementById("input-activity");
    const id_actividad =
      activity_select.options[activity_select.selectedIndex].getAttribute(
        "id_act"
      );

    const newClass = {
      activityId: id_actividad,
      timeslotId: id_timeslot,
    };

    const result = await agregarClase(newClass);
  }

  return (
    <section>
      <h1>Nueva Clase</h1>
      <section>
        <section>
          <label>Timeslots: </label>
          <DropDownTimeslots lista={timeslots} />
        </section>
        <section>
          <label>Actividades: </label>
          <DropDownActivity lista={activities} />
        </section>
        <section>
          <button onClick={cancelHandler}>Cancelar</button>
          <button onClick={saveHandler}>Crear Clase</button>
        </section>
      </section>
    </section>
  );
}

function DropDownTimeslots({ lista }) {
  return (
    <section>
      <select id="input-timeslot">
        {lista &&
          lista.map((time, index) => {
            return (
              <option id_time={time.id} key={index}>
                {time.dayOfWeek +
                  " - " +
                  time.startTime[0] +
                  ":" +
                  time.startTime[1] +
                  " - " +
                  time.endTime[0] +
                  ":" +
                  time.endTime[1]}
              </option>
            );
          })}
      </select>
    </section>
  );
}

function DropDownActivity({ lista }) {
  return (
    <section>
      <select id="input-activity">
        {lista &&
          lista.map((act, index) => {
            return (
              <option id_act={act.id} key={index}>
                {act.name}
              </option>
            );
          })}
      </select>
    </section>
  );
}

export default NewClassForm;
