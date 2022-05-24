import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { upd_Timeslot } from "../../../store/slices/timeslotList/timeslotListSlice";
import { updateTimeslot } from "../../../utils/crud";
import daysList from "./daysList";

function Edit_Timeslot(params) {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const timeslots = useSelector((state) => state.timeslotList.timeslotList);

  const [timeslot, setTimeslot] = useState(null);

  useEffect(() => {
    const time = timeslots.find((time) => {
      return time.id == id;
    });
    setTimeslot(time);
    // const day_select = document.getElementById("input-day");
    // day_select.options[day_select.selectedIndex].value = timeslot.dayOfWeek;
  }, []);

  useEffect(()=>{
    console.log(timeslot);
    // TODO hacer que, cuando cargue la pagina de editar, se resenten los valores actuales del horario
    // const day_select = document.getElementById("input-day");
    // day_select.options[day_select.selectedIndex].value = timeslot.dayOfWeek;
  }, [timeslot])

  async function saveHandler(event) {
    const day_select = document.getElementById("input-day");
    const day = day_select.options[day_select.selectedIndex].value;

    const startInput = document.querySelector("#start-Time");
    const endInput = document.querySelector("#end-Time");

    // const editedTime = {
    //   startTime: {
    //     hour: parseInt(startInput.value.substr(0, 2)),
    //     minute: parseInt(startInput.value.substr(3, 2)),
    //     second: 0,
    //     nano: 0,
    //   },
    //   endTime: {
    //     hour: parseInt(endInput.value.substr(0, 2)),
    //     minute: parseInt(endInput.value.substr(3, 2)),
    //     second: 0,
    //     nano: 0,
    //   },
    //   dayOfWeek: day,
    //   id: id
    // };
    const editedTime = {
      startTime: [
        parseInt(startInput.value.substr(0, 2)),
        parseInt(startInput.value.substr(3, 2)),
      ],
      endTime: [
        parseInt(endInput.value.substr(0, 2)),
        parseInt(endInput.value.substr(3, 2)),
      ],
      dayOfWeek: day,
      id: id
    };
    console.log(editedTime);

    const result = await updateTimeslot(editedTime);
    if(!result.message){
      // TODO actualizar en la lista de timeslots
      dispatch(upd_Timeslot(result.editedTime));
    }
  }

  function cancelarHandler(event) {
    event.preventDefault(event);
    navigate("/admin/timeslot", { replace: true });
  }

  return (
    <section>
      <h1>Editar Horario</h1>
      <section>
        <DropDownDays timeslot={timeslot} />
        <section>
          <section>
            <label>Hora de Inicio</label>
            <input id="start-Time" type="time" name="startTime" />
          </section>
          <section>
            <label>Hora de Finalización</label>
            <input id="end-Time" type="time" name="endTime" />
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

export default Edit_Timeslot;

function DropDownDays(timeslot) {
  return (
    <section>
      <select id="input-day" name="dayOfWeek" value={timeslot.dayOfWeek}>
        {daysList.map((day, index) => {
          return <option key={index}>{day}</option>;
        })}
      </select>
    </section>
  );
}
