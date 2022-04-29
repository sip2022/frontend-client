import classes from "./Planes.module.css";

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

function PlanCard({ plan }) {
  // plan -> texto, imagen, key 

  return (
    <section className={classes.plan} key={plan.key} >
      <img className={classes.plan_image} src={plan.imagen} alt="logo plan" />
      <h3 className={classes.planes_h3}>{plan.texto}</h3>
    </section>
  );
}

function Planes() {
  const planes = DUMMY_DATA;

  return (
    <section className={classes.planes_section}>
      <section className={classes.planes_text}>
        <p className={classes.planes_p}>Conoce nuestros</p>
        <h3 className={classes.planes_h3}>Planes</h3>
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
