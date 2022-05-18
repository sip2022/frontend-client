import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./NewActividadForm.module.css";

function ActividadEditForm() {
  const { id } = useParams();
  const profesores = useSelector(
    (state) => state.professorsList.professorsList
  );
  const horarios = useSelector((state) => state.timeslotList.timeslotList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [numberHor, setNumberHor] = useState(1);

  useEffect(() => {
    // TODO esta es una funcion async, agregar estado de cargado y caso en el que no sea el admin, por el JWT
    async function loadTimeslots() {
      var lista = [];
      try {
        if (!horarios) {
          lista = await getTimeslotList();
        }
      } catch (error) {
        console.log(error);
      }
      return lista;
    }

    async function loadProfesores() {
      var lista = [];
      try {
        if (!profesores) {
          lista = await getProfesoresList();
        }
      } catch (error) {
        console.log(error);
      }
      return lista;
    }

    loadTimeslots().then((data) => {
      dispatch(setTimeLista(data));
    });
    loadProfesores().then((data) => {
      console.log(data);
      dispatch(setProfessors(data));
    });
  }, []);

  function agregarHorario(event) {
    event.preventDefault(event);
  }

  function submitHandler(event) {
    event.preventDefault(event);
    // Recopilar toda la info para un post en axios
    const horario_select = document.getElementById("select-horario");
    const horario_seleccionado =
      horario_select.options[horario_select.selectedIndex];

    const prof_select = document.getElementById("input-profesor");
    const prof_seleccionado = prof_select.options[prof_select.selectedIndex];

    var newActividad = {
      name: document.getElementById("input-name").value,
      basePrice: document.getElementById("input-precio"),
      availableClass: {
        // id: "string",
        creationTimestamp: "2022-05-17T19:34:11.810Z",
        updateTimestamp: "2022-05-17T19:34:11.810Z",
        activity: {
          id: "string",
          creationTimestamp: "2022-05-17T19:34:11.810Z",
          updateTimestamp: "2022-05-17T19:34:11.810Z",
          name: "string",
          basePrice: 0,
          attendeesLimit: 0,
        },
        timeslot: {
          id: "string",
          creationTimestamp: "2022-05-17T19:34:11.810Z",
          updateTimestamp: "2022-05-17T19:34:11.810Z",
          startTime: {
            hour: 0,
            minute: 0,
            second: 0,
            nano: 0,
          },
          endTime: {
            hour: 0,
            minute: 0,
            second: 0,
            nano: 0,
          },
          dayOfWeek: "MONDAY",
        },
      },
      attendeesLimit: document.getElementById("input-asistencia"),
    };
    console.log(newActividad);
    // TODO este mock o el anterior para enviar?
    const nuevaActividad = {
      name: "string",
      basePrice: 0,
      profesor: "id_profesor",
      timeslots: [
        // Varios horarios elegidos
        // Segundos y nano, son necesarios definirlos aca??
        {
          startTime: {
            hour: 0,
            minute: 0,
          },
          endTime: {
            hour: 0,
            minute: 0,
          },
          dayOfWeek: "MONDAY",
        },
      ],
      attendeesLimit: 0,
    };
  }

  function cancelarHandler(event) {
    event.preventDefault(event);
    navigate("/admin/actividades", { replace: true });
  }

  return (
    <section>
      <h1>Nueva Actividad</h1>
      <section className={classes.newForm}>
        <section className={classes.formInputs}>
          <InputItem nombre="Nombre:">
            <input
              id="input-name"
              type="text"
              placeholder="Nombre de la actividad"
            />
          </InputItem>

          <InputItem nombre="Profesor:">
            <DropdownProf profesores={profesores} />
          </InputItem>

          <InputItem nombre="Limite de asistencia:">
            <input id="input-asistencia" type="number" />
          </InputItem>

          <InputItem nombre="Precio Base:">
            <input id="input-precio" type="text" />
          </InputItem>

          <h2>Horarios</h2>
          <HorarioCard number="1" timeslots={horarios} />

          <section>
            <button onClick={agregarHorario}>Agregar Horario (+)</button>
          </section>
        </section>
      </section>
      <section className={classes.nuevaActividad_botones}>
        <button onClick={cancelarHandler}>Cancelar</button>
        <button onClick={submitHandler}>Crear Actviidad</button>
      </section>
      <section className={classes.buttons}></section>
    </section>
  );
}

export default ActividadEditForm;
// ---------- END Formulario Editar actividad ----------

// ---------- Formulario Nueva actividad ----------
function DropdownProf({ profesores }) {
  return (
    profesores && (
      <select id="input-profesor" className={classes.dropdownProf}>
        {profesores.map((profesor, index) => {
          return (
            <option
              id_prof={profesor.id}
              value={profesor.firstName + " " + profesor.lastName}
              key={index}
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
    <section className={classes.inputItem}>
      <label>{props.nombre}</label>
      {props.children}
    </section>
  );
}
// ---------- END Inputs del fomulario ----------

// ---------- HorarioCard del fomulario ----------
function HorarioCard({ number, timeslots }) {
  return (
    <section
      id={"horario_" + number}
      number={number}
      className={classes.horarioCard}
    >
      <h3>Horario {number}</h3>
      <section className={classes.horario}>
        <select name="Horario" id="select-horario">
          {timeslots &&
            timeslots.map((times, index) => {
              const valor =
                times.dayOfWeek +
                " - " +
                times.startTime.hour +
                ":" +
                times.startTime.minute +
                " - " +
                times.endTime.hour +
                ":" +
                times.endTime.minute;
              return (
                <option
                  value={valor}
                  key={index}
                  dia={times.dayOfWeek}
                  hora_ini={times.startTime.hour}
                  minute_ini={times.startTime.minute}
                  hora_end={times.endTime.hour}
                  minute_end={times.endTime.minute}
                >
                  {valor}
                </option>
              );
            })}
        </select>
      </section>
    </section>
  );
}
// ---------- END HorarioCard del fomulario ----------
