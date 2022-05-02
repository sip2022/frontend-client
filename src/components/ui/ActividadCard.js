import classes from "./ActividadCard.module.css";

function ActividadCard({ actividad }) {
  // actividad = { texto, imagen }
  return (
    <section className={classes.actividad} key={actividad.key}>
      <img
        className={classes.actividad_image}
        src={actividad.imagen}
        alt="logo actividad"
      />
      <section>
        <p>{actividad.texto}</p>
        <button className={classes.boton_verMas}>Ver Mas</button>
      </section>
    </section>
  );
}

export default ActividadCard;