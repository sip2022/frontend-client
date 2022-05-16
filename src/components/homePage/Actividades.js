import { useNavigate } from "react-router-dom";
import ActividadCard from "../ui/ActividadCard";
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

function Actividades() {
  const actividades = DUMMY_DATA;
  const navigate = useNavigate();

  function verActividadesHandler(event){
    event.preventDefault();
    navigate("/actividades", { replace: true });
  }

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
        <section className={classes.card_verMas} onClick={verActividadesHandler}>Ver Mas Actividades</section>
      </section>
    </section>
  );
}

export default Actividades;
