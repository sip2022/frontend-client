import { useEffect, useState } from "react";
import classes from "./PlanList.module.css";

// Dummy data sobre los planes
// TODO traerlos desde el Back cuando se implemente.
const DUMMY_DATA = [
  {
    nombre: "Bronze",
    imagen: "/images/planes_images/iconoPlanBronze.png",
    descripcion: ["X actividades por semana", "Más Info"],
  },
  {
    nombre: "Silver",
    imagen: "/images/planes_images/iconoPlanSilver.png",
    descripcion: ["X actividades por semana", "Más Info"],
  },
  {
    nombre: "Gold",
    imagen: "/images/planes_images/iconoPlanGold.png",
    descripcion: ["X actividades por semana", "Más Info"],
  },
  {
    nombre: "Platinum",
    imagen: "/images/planes_images/iconoPlanPlatinum.png",
    descripcion: ["X actividades por semana", "Más Info"],
  },
];

function PlanCardPage({ nombre, imagen, descripcion }) {
  return (
    <section className={classes.singlePlan}>
      <section className={classes.plan_image}>
        <img src={imagen} />
      </section>
      <section>
        <h2>{nombre}</h2>
        <ul>{descripcion.map((desc, index) => {
          return <li key={index}>{desc}</li>
        })}</ul>
      </section>
    </section>
  );
}

function PlanList(props) {
  const [planes, setPlanes] = useState([]);
  useEffect(() => {
    setPlanes(DUMMY_DATA);
  }, []);

  return (
    <section>
      <section className={classes.planes}>
        {/* TODO Lista de planes,  */}
        {planes ? planes.map((plan, index) => {
          return <PlanCardPage nombre={plan.nombre} imagen={plan.imagen} descripcion={plan.descripcion} key={index} />
        }) : null}
      </section>
      <section>
        <h2>Elegí tu plan y comenzá a entrenar</h2>
        <button>Suscribete</button>
      </section>
    </section>
  );
}

export default PlanList;
