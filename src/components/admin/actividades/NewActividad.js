import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProfessors } from "../../../store/slices/professorsList/professorsListSlice";
import { agregarActividad, loadProfessors } from "../../../utils/crud";
import classes from "./NewActividadForm.module.css";

// ---------- Formulario Nueva actividad ----------
function NewActividadForm() {
  const profesores = useSelector(
    (state) => state.professorsList.professorsList
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    basePrice: 0,
    name: "",
    attendeesLimit: 0,
  });

  useEffect(() => {
    // TODO esta es una funcion async, agregar estado de cargado y caso en el que no sea el admin, por el JWT
    async function loadProfesores() {
      try {
        if (!profesores) {
          var lista = await loadProfessors();
          return lista;
        }else{
          throw "Exception"
        }
      } catch (error) {
        throw new Error('Profesores already loaded');
      }
    }
    loadProfesores().then((data) => {
      dispatch(setProfessors(data));
    }).catch((eror) => {
      // Nothing
    });
  }, []);

  async function submitHandler(event) {
    event.preventDefault(event);
    const prof_select = document.getElementById("input-profesor");
    const id_prof_select =
      prof_select.options[prof_select.selectedIndex].getAttribute("id_prof");
    const prof = profesores.find((profe) => {
      return profe.id == id_prof_select;
    });
    const newAct = {
      ...input,
      professor: {
        id: prof.id,
        email: prof.email,
        firstName: prof.firstName,
        lastName: prof.lastName,
      },
    };
    console.log(newAct);
    const result = await agregarActividad(newAct);
    // TODO Marcar que la actividad se creo con o sin exito
  }

  function cancelarHandler(event) {
    event.preventDefault(event);
    navigate("/admin/actividades", { replace: true });
  }

  function handleChange({ value, name }) {
    setInput((prev) => ({ ...prev, [name]: value }));
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
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e.target)}
            />
          </InputItem>

          <InputItem nombre="Profesor:">
            <DropdownProf profesores={profesores} />
          </InputItem>

          <InputItem nombre="Limite de asistencia:">
            <input
              id="input-asistencia"
              type="number"
              value={input.attendeesLimit}
              name="attendeesLimit"
              onChange={(e) => handleChange(e.target)}
            />
          </InputItem>

          <InputItem nombre="Precio Base:">
            <input
              id="input-precio"
              type="text"
              value={input.basePrice}
              name="basePrice"
              onChange={(e) => handleChange(e.target)}
            />
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
