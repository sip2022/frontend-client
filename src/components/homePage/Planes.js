import classes from "./Planes.module.css";

function PlanCard({ plan }) {
  // plan -> texto, imagen, key 

  return (
    <section className={classes.plan} key={plan.key} >
      <img className={classes.image} src={plan.imagen} alt="logo plan" />
      <h3>{plan.texto}</h3>
    </section>
  );
}

// TODO eliminar Dummy data una vez la coneion con el back este hecha
const DUMMY_DATA = [
  {
    texto: "Bronze",
    imagen: "/images/planes_images/iconoPlanBronze.png",
  },
  {
    texto: "Silver",
    imagen: "/images/planes_images/iconoPlanSilver.png",
  },
  {
    texto: "Gold",
    imagen: "/images/planes_images/iconoPlanGold.png",
  },
  {
    texto: "Platinum",
    imagen: "/images/planes_images/iconoPlanPlatinum.png",
  },
];

function Planes(props) {
  const planes = DUMMY_DATA;

  return (
    <section className={classes.planes_section}>
      <section className={classes.planes_text}>
        <p>Conoce nuestros</p>
        <h3>Planes</h3>
      </section>

      {planes
        ? planes.map((plan, index) => {
            return <PlanCard plan={plan} key={index} />;
          })
        : null}
    </section>
  );
}

export default Planes;
