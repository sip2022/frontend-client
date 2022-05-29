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
    <section className={classes.actividad} key={key}>
      <section>
        <p>{name}</p>
        <button className={classes.boton_verMas} onClick={clickHandler}>
          Ver Mas
        </button>
      </section>
    </section>
  );
}

export default ActividadCard;
