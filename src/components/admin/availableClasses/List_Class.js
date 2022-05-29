import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { set_ClassLista } from "../../../store/slices/classesList/classesListSlice";
import { eliminarClass, loadClassList } from "../../../utils/crud";

function List_Class(params) {
  const classes = useSelector((state) => state.classList.classList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState({
    flag: false,
    message: "",
  });

  useEffect(() => {
    // TODO dispatch loadClassList
    async function loadClasses() {
      try {
        if (!classes) {
          var lista = await loadClassList();
          return lista;
        } else {
          throw "Exception";
        }
      } catch (error) {
        throw new Error("Clases already loaded");
      }
    }

    loadClasses()
      .then((data) => {
        dispatch(set_ClassLista(data.classes));
      })
      .catch((error) => {
        // Nothing
      });
  }, []);

  function altaClickHandler() {
    navigate("/admin/classes/new", { replace: true });
  }

  function editarHandler(params) {
    console.log(params);
    navigate("/admin/classes/edit/" + params, { replace: true });
  }

  async function eliminarHandler(params) {
    setError({ flag: false });
    const result = await eliminarClass(params);
    if (result.message) {
      console.log(result.message);
      setError({ flag: true, message: result.message });
    }
  }

  function goBackHandler(params) {
    navigate("/admin", { replace: true });
  }

  return (
    <section>
      <h1>Lista de Clases</h1>
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
                    {clas.activityDto.name + " - $" + clas.activityDto.basePrice} 
                  </p>
                  <p>
                    {clas.timeslotDto.dayOfWeek +
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
        <section>
          <button onClick={goBackHandler}>Volver</button>
        </section>
      </section>
    </section>
  );
}

export default List_Class;
