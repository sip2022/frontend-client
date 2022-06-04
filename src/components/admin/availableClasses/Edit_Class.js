import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ReduxService from "../../../store/redux.service";

import { load_list_professor } from "../../../store/slices/professorsList/professorsListSlice";
import { update_class } from "../../../utils/crud";
import daysList from "../timeslots/daysList";

function Edit_Class(params) {
  const { id_class } = useParams();
  const profesores = useSelector(
    (state) => state.professorsList.professorsList
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [clase, setClase] = useState({});
  const [actividad, setActividad] = useState({});
  const [horario, setHorario] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    if (!profesores) dispatch(load_list_professor());


    const clase = ReduxService.get_Class_byID(id_class);
    setClase(clase);
    setActividad(clase.activityDto);
    setHorario(clase.timeslotDto);
  }, []);

  async function saveHandler(params) {
    // El profesor lo tomamos directamente del input
    // Los datos del horario los tomamos del input directamente

    // TODO refactor del armado del objeto, sacar atributos del useState

    const select_prof = document.getElementById("input-profesor");
    const edited_prof_id =
      select_prof.options[select_prof.selectedIndex].getAttribute("id_prof");
    const edited_prof = profesores.find((prof) => {
      return prof.id == edited_prof_id;
    });
    if (validaciones) {
      const claseEditada = {
        id: id_class,
        activityDto: {
          id: actividad.id,
          name: actividad.name,
          basePrice: actividad.basePrice,
          professor: edited_prof,
          attendeesLimit: actividad.attendeesLimit,
        },
        timeslotDto: {
          id: horario.id,
          startTime: {
            hour: parseInt(
              document.getElementById("start-Time").value.substr(0, 2)
            ),
            minute: parseInt(
              document.getElementById("start-Time").value.substr(3, 2)
            ),
            second: 0,
            nano: 0,
          },
          endTime: {
            hour: parseInt(
              document.getElementById("end-Time").value.substr(0, 2)
            ),
            minute: parseInt(
              document.getElementById("end-Time").value.substr(3, 2)
            ),
            second: 0,
            nano: 0,
          },
          dayOfWeek: document.getElementById("input-day").value,
        },
      };
      const result = await update_class(claseEditada);
      if (!result.message) alert("¡Clase Editada con Exito!");
      else setError(result.message);
    }
  }

  function validaciones() {
    // TODO realizar chequeos, mientras dejar un indicativo de cargado (los puntitos rodando por ejemplo) en pantalla
    return true;
  }

  function cancelarHandler(event) {
    event.preventDefault(event);
    navigate("/admin/classes", { replace: true });
  }

  function clearError(params) {
    setError("");
  }

  function onChangeHandler({ name, value }, object) {
    switch (object) {
      case "actividad":
        setActividad((prev) => ({ ...prev, [name]: value }));
        break;
      case "horario":
        setHorario((prev) => ({ ...prev, [name]: value }));
        break;
    }
  }

  /*
    TODO REALIZAR UN REFACTOR MASIVO
    MOVER COMPONENTES UTILIZADOS POR VARIOS COMPONENTES A UN SOLO ARCHIVO, DONDE SE IMPORTARAN DESDE AHI
  */
  return (
    <section>
      <h1>Editar Clase</h1>
      <section>
        <h2>Editar Actividad</h2>
        <section>
          <section>
            <InputItem nombre="Nombre:">
              <input
                id="input-name"
                type="text"
                placeholder="Nombre de la actividad"
                value={actividad.name}
                name="name"
                onChange={(e) => onChangeHandler(e.target, "actividad")}
              />
            </InputItem>

            <InputItem nombre="Profesor:">
              <DropdownProf profesores={profesores} />
            </InputItem>

            <InputItem nombre="Limite de asistencia:">
              <input
                id="input-asistencia"
                type="number"
                value={actividad.attendeesLimit}
                name="attendeesLimit"
                onChange={(e) => onChangeHandler(e.target, "actividad")}
              />
            </InputItem>

            <InputItem nombre="Precio Base:">
              <input
                id="input-precio"
                type="text"
                value={actividad.basePrice}
                name="basePrice"
                onChange={(e) => onChangeHandler(e.target, "actividad")}
              />
            </InputItem>
          </section>
        </section>
      </section>
      <section>
        <h2>Editar Horario</h2>
        <section>
          <DropDownDays />
          <section>
            <section>
              <label>Hora de Inicio</label>
              <input id="start-Time" type="time" name="startTime" />
            </section>
            <section>
              <label>Hora de Finalización</label>
              <input id="end-Time" type="time" name="endTime" />
            </section>
          </section>
        </section>
      </section>
      {error && (
        <section>
          <p>{error}</p>
        </section>
      )}
      <section>
        <button onClick={cancelarHandler}>Cancelar</button>
        <button onClick={saveHandler}>Guardar Cambios</button>
      </section>
    </section>
  );
}

export default Edit_Class;

// TODO REFACTOR, MOVER TODO LO SIGUIENTE A ARCHIVOS INDIVIDUALES, PARA NO REPETIR

// ---------- Formulario Nueva actividad ----------
function DropdownProf({ profesores }) {
  return (
    profesores && (
      <select id="input-profesor">
        {profesores.map((profesor, index) => {
          return (
            <option
              id_prof={profesor.id}
              key={index}
              value={profesor.firstName + " " + profesor.lastName}
            >
              {profesor.firstName + " " + profesor.lastName}
            </option>
          );
        })}
      </select>
    )
  );
}

// ---------- Inputs del fomulario ----------
function InputItem(props) {
  // nombre, input en si (children),
  return (
    <section>
      <label>{props.nombre}</label>
      {props.children}
    </section>
  );
}
// ---------- END Inputs del fomulario ----------

function DropDownDays() {
  return (
    <section>
      <select id="input-day" name="dayOfWeek">
        {daysList.map((day, index) => {
          return <option key={index}>{day}</option>;
        })}
      </select>
    </section>
  );
}
