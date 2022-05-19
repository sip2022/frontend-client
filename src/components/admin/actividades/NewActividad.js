import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProfessors } from "../../../store/slices/professorsList/professorsListSlice";
import { setTimeLista } from "../../../store/slices/timeslotList/timeslotListSlice";
import { agregarActividad, getProfesoresList, getTimeslotList } from "../../../utils/crud";
import classes from "./NewActividadForm.module.css";

// ---------- Formulario Nueva actividad ----------
function NewActividadForm() {
  const profesores = useSelector(
    (state) => state.professorsList.professorsList
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [numberHor, setNumberHor] = useState(1);

  useEffect(() => {
    // TODO esta es una funcion async, agregar estado de cargado y caso en el que no sea el admin, por el JWT
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

    loadProfesores().then((data) => {
      console.log(data);
      dispatch(setProfessors(data));
    });
  }, []);

  function agregarHorario(event) {
    event.preventDefault(event);
    
  }

  async function submitHandler(event) {
    event.preventDefault(event);
    const prof_select = document.getElementById("input-profesor");
    const prof_seleccionado = prof_select.options[prof_select.selectedIndex].getAttribute("id_prof")
    const newAct = {
      name: document.getElementById("input-name").value,
      basePrice: document.getElementById("input-precio").value,
      atendeesLimit: document.getElementById("input-asistencia").value,
      profesor: prof_seleccionado,
    };
    const result = await agregarActividad(newAct);
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

export default NewActividadForm;
// ---------- END Formulario Nueva actividad ----------

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

function InputItem(props) {
  // nombre, input en si (children),
  return (
    <section className={classes.inputItem}>
      <label>{props.nombre}</label>
      {props.children}
    </section>
  );
}