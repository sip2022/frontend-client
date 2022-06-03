import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { load_list_activity } from "../../../store/slices/activityList/activityListSlice";
import { load_list_timeslot } from "../../../store/slices/timeslotList/timeslotListSlice";
import { agregarClase } from "../../../utils/crud";
import { translateDay } from "../../../utils/translation";

function New_Class(params) {
  const timeslots = useSelector((state) => state.timeslotList.timeslotList);
  const activities = useSelector((state) => state.activityList.activityList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(async () => {
    if (!timeslots) dispatch(load_list_timeslot());
    if (!activities) dispatch(load_list_activity());
  }, []);

  function cancelHandler(event) {
    event.preventDefault();
    navigate("/admin/classes", { replace: true });
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
    if (!result.message) alert("¡Clase creada!");
    else setError(result.message);
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
        {error && (
          <section>
            <p>{error}</p>
          </section>
        )}
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
                {translateDay(time.dayOfWeek) +
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

export default New_Class;
