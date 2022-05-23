import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTimeLista } from "../../../store/slices/timeslotList/timeslotListSlice";
import { loadTimeslotList } from "../../../utils/crud";

function Edit_TimeSlot(params) {
  const timeslots = useSelector((state) => state.timeslotList.timeslotList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        console.log(data);
        dispatch(setTimeLista(data));
      })
      .catch((error) => {
        // Nothing
      });
  }, []);

  function altaClickHandler() {
    navigate("/admin/actividad/new", { replace: true });
  }

  function editarHandler(params) {
    console.log(params);
    // navigate("/admin/timeslot/edit/" + params, {replace: true})
  }

  async function eliminarHandler(params) {
    console.log(params);
    // const result = await eliminarActividad(params);
  }


  return (
    <section>
      <h1>Lista de horarios disponibles</h1>
      <section>
        <section>
          <button onClick={altaClickHandler}>Agregar Horario</button>
        </section>
        <section>
          {timeslots && timeslots.map((time, index) => {
            return <section key={index}>
              <p>{time.dayOfWeek+": "+time.startTime[0]+":"+time.startTime[1]+" - "+time.endTime[0]+":"+time.endTime[1]} </p>
              <section>
                <button onClick={() => editarHandler(time.id)}>Editar</button>
                <button onClick={() => eliminarHandler(time.id)}>Eliminar</button>
              </section>
            </section>
          })}
        </section>
      </section>
    </section>
  );
}

export default Edit_TimeSlot;
