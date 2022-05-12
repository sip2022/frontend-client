import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProfessors } from "../../../store/slices/professorsList/professorsListSlice";
import classes from "./NewActividadForm.module.css";

// ---------- Formulario Nueva actividad ----------
function NewActividadForm() {
  const profesores = useSelector(
    (state) => state.professorsList.professorsList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProfessors());
  }, []);

  return (
    <section>
      <h1>Nueva Actividad</h1>
      <section className={classes.newForm}>
        <section className={classes.formInputs}>
          <InputItem nombre="Nombre:">
            <input type="text" placeholder="Nombre de la actividad"/>
          </InputItem>

          {/* TODO Problema here */}
          <InputItem nombre="Profesor:">
            <DropdownProf profesores={profesores} />
          </InputItem>

          <InputItem nombre="Limite de asistencia:">
            <input type="number"/>
          </InputItem>

          <InputItem nombre="Precio Base:">
            <input type="text"/>
          </InputItem>
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

  useEffect(()=> {
    console.log(profesores);
  }, [])

  return (
    <select className={classes.dropdownProf}>
      {/* {profesores.map((prof) => {
        return <option value={prof.nombre}>{prof.name}</option>;
      })} */}
    </select>
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
