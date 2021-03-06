import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { load_list_class } from "../../../store/slices/classesList/classesListSlice";
import { eliminarClass } from "../../../utils/crud";
import { translateDay } from "../../../utils/translation";
import ImgLoading from "../../ui/ImgLoading";

function List_Class() {
  const { classList: classes, status } = useSelector(
    (state) => state.classList
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState({
    flag: false,
    message: "",
  });

  useEffect(() => {
    if (!classes) dispatch(load_list_class());
  }, []);

  function altaClickHandler() {
    navigate("/admin/classes/new", { replace: true });
  }

  function editarHandler(params) {
    navigate("/admin/classes/edit/" + params, { replace: true });
  }

  async function eliminarHandler(params) {
    setError({ flag: false });
    const result = await eliminarClass(params);
    if (result.message) {
      setError({ flag: true, message: result.message });
    }
  }

  function goBackHandler() {
    navigate("/admin", { replace: true });
  }

  return (
    <section>
      <h1>Lista de Clases</h1>
      <section>
        {status == "pending" && (
          <ImgLoading text={"Cargando lista de Clases..."} />
        )}
        {status == "fulfilled" && (
          <section>
            <section>
              <button onClick={altaClickHandler}>Agregar Clase</button>
            </section>
            <section>
              {classes &&
                classes.map((clas, index) => {
                  return (
                    <section key={index}>
                      <p>
                        {clas.activityDto.name +
                          " - $" +
                          clas.activityDto.basePrice}
                      </p>
                      <p>
                        {translateDay(clas.timeslotDto.dayOfWeek) +
                          ": " +
                          clas.timeslotDto.startTime[0] +
                          ":" +
                          clas.timeslotDto.startTime[1] +
                          " - " +
                          clas.timeslotDto.endTime[0] +
                          ":" +
                          clas.timeslotDto.endTime[1]}
                      </p>
                      <section>
                        <button onClick={() => editarHandler(clas.id)}>
                          Editar
                        </button>
                        <button onClick={() => eliminarHandler(clas.id)}>
                          Eliminar
                        </button>
                      </section>
                    </section>
                  );
                })}
            </section>
          </section>
        )}
        {status == "rejected" && (
          <p>No se ha podido cargar la lista de Clases</p>
        )}

        <section>
          <button onClick={goBackHandler}>Volver</button>
        </section>
      </section>
    </section>
  );
}

export default List_Class;
