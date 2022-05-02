import ActividadCard from "../ui/ActividadCard";
import classes from "./ActividadesList.module.css";

const DUMMY_DATA = [
  {
    id: 1,
    texto: "Actividad",
    imagen: "/images/actividades_images/activityCardImage.jpg"
  },
  {
    id: 2,
    texto: "Actividad",
    imagen: "/images/actividades_images/activityCardImage.jpg"
  },
  {
    id: 3,
    texto: "Actividad",
    imagen: "/images/actividades_images/activityCardImage.jpg"
  },
  {
    id: 4,
    texto: "Actividad",
    imagen: "/images/actividades_images/activityCardImage.jpg"
  },
  {
    id: 5,
    texto: "Actividad",
    imagen: "/images/actividades_images/activityCardImage.jpg"
  },
]

function ActividadesList(props) {
  const actividades = DUMMY_DATA;
  
  return <section className={classes.section_actividades}>
    {actividades ? actividades.map((actividad, index) => {
      return <ActividadCard actividad={actividad} key={index} />
    }) : null}
  </section>;
}

export default ActividadesList;
