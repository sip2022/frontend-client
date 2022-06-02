import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { load_list_professor } from "../../../store/slices/professorsList/professorsListSlice";
import { actualizarActividad } from "../../../utils/crud";
import classes from "./NewActividadForm.module.css";

function ActividadEditForm() {
  const { id } = useParams();
  const profesores = useSelector(
    (state) => state.professorsList.professorsList
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!profesores) dispatch(load_list_professor());
  }, []);

  async function submitHandler(event) {
    event.preventDefault(event);
    const prof_select = document.getElementById("input-profesor");
    const prof_seleccionado = prof_select.options[prof_select.selectedIndex];
    const act = {
      name: document.getElementById("input-name").value,
      basePrice: document.getElementById("input-precio").value,
      atendeesLimit: document.getElementById("input-asistencia").value,
      profesor: prof_seleccionado,
    };
    const result = await actualizarActividad(act);
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
        <button onClick={submitHandler}>Actualizar Actividad</button>
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
