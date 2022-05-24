import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { add_Timeslot } from "../../../store/slices/timeslotList/timeslotListSlice";
import { agregarTimeslot } from "../../../utils/crud";
import daysList from "./daysList";


const days = daysList;

function NewTimeslotForm(params) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function saveHandler(event) {
    // TODO avisar si hubo un problema
    event.preventDefault(event);

    const day_select = document.getElementById("input-day");
    const day = day_select.options[day_select.selectedIndex].value;

    const startInput = document.querySelector("#start-Time");
    const endInput = document.querySelector("#end-Time");

    const newTime = {
      startTime: [
        parseInt(startInput.value.substr(0, 2)),
        parseInt(startInput.value.substr(3, 2)),
      ],
      endTime: [
        parseInt(endInput.value.substr(0, 2)),
        parseInt(endInput.value.substr(3, 2)),
      ],
      dayOfWeek: day,
    };

    const result = await agregarTimeslot(newTime).then((data) => {
      dispatch(add_Timeslot(data.timeslot));
    });
  }

  function cancelarHandler(event) {
    event.preventDefault(event);
    navigate("/admin/timeslot", { replace: true });
  }

  return (
    <section>
      <h1>Nuevo Horario</h1>
      <section>
        <DropDownDays />
        <section>
          <section>
            <label>Hora de Inicio</label>
            <input id="start-Time" type="time" />
          </section>
          <section>
            <label>Hora de Finalización</label>
            <input id="end-Time" type="time" />
          </section>
          <section>
            <button onClick={cancelarHandler}>Cancelar</button>
            <button onClick={saveHandler}>Guardar Timeslot</button>
          </section>
        </section>
      </section>
    </section>
  );
}

export default NewTimeslotForm;

function DropDownDays() {
  return (
    <section>
      <select id="input-day">
        {days.map((day, index) => {
          return <option key={index}>{day}</option>;
        })}
      </select>
    </section>
  );
}
