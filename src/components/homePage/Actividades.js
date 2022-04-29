import classes from "./Actividades.module.css";

// TODO cambiar las imagenes, cuando esten disponibles
const DUMMY_DATA = [
  {
    texto: "Crossfit",
    imagen: "/images/actividades_images/activityCardImage.jpg",
  },
  {
    texto: "Spinning",
    imagen: "/images/actividades_images/activityCardImage.jpg",
  },
  {
    texto: "Musculacion",
    imagen: "/images/actividades_images/activityCardImage.jpg",
  },
  {
    texto: "Natacion",
    imagen: "/images/actividades_images/activityCardImage.jpg",
  },
  {
    texto: "Boxeo",
    imagen: "/images/actividades_images/activityCardImage.jpg",
  },
];

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

function Actividades() {
  const actividades = DUMMY_DATA;

  return (
    <section className={classes.actividades_section}>
      <section>
        <h2>Actividades</h2>
      </section>
      <section className={classes.actividades_list}>
        {actividades
          ? actividades.map((actividad, index) => {
              return <ActividadCard actividad={actividad} key={index} />;
            })
          : null}
        <section className={classes.card_verMas}>Ver Mas Actividades</section>
      </section>
    </section>
  );
}

export default Actividades;
