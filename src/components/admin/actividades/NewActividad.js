import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfessorsList } from "../../../store/slices/professorsList/actions";
import { setTimeslotList } from "../../../store/slices/timeslotList/actions";
import { getProfesoresList, getTimeslotList } from "../../../utils/crud";
import classes from "./NewActividadForm.module.css";

// ---------- Formulario Nueva actividad ----------
function NewActividadForm() {
  const profesores = useSelector(
    (state) => state.professorsList.professorsList
  );
  const horarios = useSelector((state) => state.timeslotList.timeslotList);
  const dispatch = useDispatch();

  useEffect(() => {
    // TODO esta es una funcion async, agregar estado de cargado y caso en el que no sea el admin, por el JWT
    async function loadTimeslots() {
      if (!horarios) {
        const lista = await getTimeslotList();
        dispatch(setTimeslotList(lista));
      }
    }
    async function loadProfesores() {
      if (!profesores) {
        const lista = await getProfesoresList();
        dispatch(setProfessorsList(lista));
      }
    }
    loadTimeslots();
    loadProfesores();
  }, []);

  return (
    <section>
      <h1>Nueva Actividad</h1>
      <section className={classes.newForm}>
        <section className={classes.formInputs}>
          <InputItem nombre="Nombre:">
            <input type="text" placeholder="Nombre de la actividad" />
          </InputItem>

          {/* TODO Problema here */}
          <InputItem nombre="Profesor:">
            <DropdownProf profesores={profesores} />
          </InputItem>

          <InputItem nombre="Limite de asistencia:">
            <input type="number" />
          </InputItem>

          <InputItem nombre="Precio Base:">
            <input type="text" />
          </InputItem>

          <h2>Horarios</h2>
        </section>
      </section>
      <section className={classes.buttons}></section>
    </section>
  );
}

export default NewActividadForm;
// ---------- END Formulario Nueva actividad ----------

// ---------- Formulario Nueva actividad ----------
function DropdownProf({ profesores }) {
  useEffect(() => {
    console.log(profesores);
  }, []);

  return (
    profesores && (
      <select className={classes.dropdownProf}>
        {profesores.map((profesor, index) => {
          return (
            <option value={profesor.firstame + " " + profesor.lastName}>
              {profesor.firstame + " " + profesor.lastName}
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
    <section className={classes.horarioCard}>
      <h3>Horario {number}</h3>
      <section className={classes.horario}>
        <label className={classes.horarioLabel}>Horario Inicio</label>
        <select name="Horario_Inicio" id="Hora_Inicio">
          {timeslots.map((times) => {
            const valor =
              times.dayOfWeek +
              " - " +
              times.startTime.hour +
              ":" +
              times.startTime.minute;
            return <option value={valor}>{valor}</option>;
          })}
        </select>

        <label className={classes.horarioLabel}>Horario Fin</label>
        <select name="Horario_Fin" id="Hora_Fin">
          {timeslots.map((times) => {
            const valor =
              times.dayOfWeek +
              " - " +
              times.endTime.hour +
              ":" +
              times.endTime.minute;
            return <option value={valor}>{valor}</option>;
          })}
        </select>
      </section>
    </section>
  );
}
// ---------- END HorarioCard del fomulario ----------
