import { useNavigate } from "react-router-dom";
import classes from "./ActividadCard.module.css";

function ActividadCard({ actividad }) {
  const { id, texto, imagen, key } = actividad;

  const navigate = useNavigate();

  function clickHandler(event) {
    event.preventDefault();
    navigate("/actividad/" + id, { replace: true });
  }

  return (
    <section className={classes.actividad} key={key}>
      <img
        className={classes.actividad_image}
        src={imagen}
        alt="logo actividad"
      />
      <section>
        <p>{texto}</p>
        <button className={classes.boton_verMas} onClick={clickHandler}>
          Ver Mas
        </button>
      </section>
    </section>
  );
}

export default ActividadCard;
