import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import userService from "../../../services/user.service";
import { setActivityLista } from "../../../store/slices/activityList/activityListSlice";
import { setTimeLista } from "../../../store/slices/timeslotList/timeslotListSlice";
import {
  agregarClase,
  getTimeslotList,
  loadActivityList,
} from "../../../utils/crud";

function NewClassForm(params) {
  const timeslots = useSelector((state) => state.timeslotList.timeslotList);
  const activities = useSelector((state) => state.activityList.activityList);
  const dispatch = useDispatch();

  useEffect(async () => {
    // TODO esto va en UserService
    async function loadTimeslots() {
      var lista = [];
      try {
        if (!timeslots) {
          lista = await getTimeslotList();
        }
      } catch (error) {
        console.log(error);
      }
      return lista;
    }

    // TODO esto va en UserService
    async function loadActividades() {
      var lista = [];
      try {
        if (!activities) {
          lista = await loadActivityList();
        }
      } catch (error) {
        console.log(error);
      }
      return lista;
    }

    await loadActividades().then((data) => {
      console.log(data);
      dispatch(setActivityLista(data));
    });

    await loadTimeslots().then((data) => {
      console.log(data);
      dispatch(setTimeLista(data));
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
