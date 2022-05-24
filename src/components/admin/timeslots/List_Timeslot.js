import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { set_TimeLista } from "../../../store/slices/timeslotList/timeslotListSlice";
import { eliminarTimeslot, loadTimeslotList } from "../../../utils/crud";

function List_TimeSlot(params) {
  const timeslots = useSelector((state) => state.timeslotList.timeslotList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState({
    flag: false,
    message: "",
  });

  useEffect(() => {
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

    loadTimeslots()
      .then((data) => {
        dispatch(set_TimeLista(data));
      })
      .catch((error) => {
        // Nothing
      });
  }, []);

  function altaClickHandler() {
    navigate("/admin/timeslot/new", { replace: true });
  }

  function editarHandler(params) {
    console.log(params);
    navigate("/admin/timeslot/edit/" + params, {replace: true})
  }

  async function eliminarHandler(params) {
    setError({ flag: false });
    const result = await eliminarTimeslot(params);
    if (result.message) {
      console.log(result.message);
      setError({ flag: true, message: result.message });
    }
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
                      time.endTime[1]}{" "}
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
      </section>
    </section>
  );
}

export default List_TimeSlot;
