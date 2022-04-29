import classes from "./Actividades.module.css";

function ActividadCard(props) {
  return <section></section>
}

// TODO cambiar las imagenes, cuando esten disponibles
const DUMMY_DATA = [
  {
    texto: "Crossfit",
    imagen: "/images/actividades_images/activityCardImage.jpg"
  },
  {
    texto: "Spinning",
    imagen: "/images/actividades_images/activityCardImage.jpg"
  },
  {
    texto: "Musculacion",
    imagen: "/images/actividades_images/activityCardImage.jpg"
  },
  {
    texto: "Natacion",
    imagen: "/images/actividades_images/activityCardImage.jpg"
  },
  {
    texto: "Boxeo",
    imagen: "/images/actividades_images/activityCardImage.jpg"
  },
]

function Actividades(props) {

  const actividades = DUMMY_DATA;

  return <section className={classes.actividades_section}>
    {/* Las actividades */}
    {actividades ? actividades.map((actividad, index) => {

    }) : null}
    {/* Card "Ver mas actividades" */}
  
  </section>;
}

export default Actividades;
