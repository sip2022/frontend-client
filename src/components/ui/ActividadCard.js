import { useNavigate } from "react-router-dom";
import classes from "./ActividadCard.module.css";

function ActividadCard({ actividad }) {
  const { id, name, key } = actividad;

  const navigate = useNavigate();

  function clickHandler(event) {
    event.preventDefault();
    navigate("/actividad/" + id, { replace: true });
  }

  return (
    // <section className="bg-[#BFE0DC] rounded-[1rem]" key={key}>
    <section className={classes.actividad} key={key} onClick={clickHandler}>
      <section>
        <p className={classes.actividad_nombre}>{name}</p>
        {/* <button {...{[variableX]: true}} crear className={classes.boton_verMas} onClick={clickHandler}> */}
       {/* <p>Ver Más</p> */}
      </section>
    </section>
  );
}

export default ActividadCard;
