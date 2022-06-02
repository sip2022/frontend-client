import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { load_list_timeslot } from "../../../store/slices/timeslotList/timeslotListSlice";
import { eliminarTimeslot } from "../../../utils/crud";

function List_TimeSlot(params) {
  const timeslots = useSelector((state) => state.timeslotList.timeslotList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState({
    flag: false,
    message: "",
  });

  useEffect(() => {
    if (!timeslots) dispatch(load_list_timeslot());
  }, []);

  function altaClickHandler() {
    navigate("/admin/timeslot/new", { replace: true });
  }

  function editarHandler(params) {
    navigate("/admin/timeslot/edit/" + params, { replace: true });
  }

  async function eliminarHandler(params) {
    setError({ flag: false });
    const result = await eliminarTimeslot(params);
    if (result.message) {
      setError({ flag: true, message: result.message });
    }
  }

  function goBackHandler(params) {
    navigate("/admin", { replace: true });
  }

  return (
    <section>
      <h1>Lista de horarios disponibles</h1>
      <section>
        <section>
          <button onClick={altaClickHandler}>Agregar Horario</button>
        </section>
        <section>
          {timeslots &&
            timeslots.map((time, index) => {
              return (
                <section key={index}>
                  <p>
                    {time.dayOfWeek +
                      ": " +
                      time.startTime[0] +
                      ":" +
                      time.startTime[1] +
                      " - " +
                      time.endTime[0] +
                      ":" +
                      time.endTime[1]}
                  </p>
                  {error.flag && (
                    <section>
                      <p>{error.message}</p>
                    </section>
                  )}
                  <section>
                    <button onClick={() => editarHandler(time.id)}>
                      Editar
                    </button>
                    <button onClick={() => eliminarHandler(time.id)}>
                      Eliminar
                    </button>
                  </section>
                </section>
              );
            })}
        </section>
        <section>
          <button onClick={goBackHandler}>Volver</button>
        </section>
      </section>
    </section>
  );
}

export default List_TimeSlot;
