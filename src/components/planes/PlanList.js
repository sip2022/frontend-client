import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { load_list_planes } from "../../store/slices/planList/planListSlice";
import classes from "./PlanList.module.css";

// Dummy data sobre los planes
// TODO traerlos desde el Back cuando se implemente.

function PlanCardPage({ key, id, name, activitiesLimit }) {
  const navigate = useNavigate();

  function clickHandler(event) {
    event.preventDefault();
    navigate("/planes/" + id, { replace: true });
  }

  return (
    <section className={classes.singlePlan} id={id} onClick={clickHandler}>
      <section>
        <h2>{name}</h2>
        <ul>
          <li>{"Limite de actividades: " + activitiesLimit}</li>
        </ul>
      </section>
    </section>
  );
}

function PlanList(props) {
  // const [planes, setPlanes] = useState([]);
  const planes = useSelector((state) => state.planList.planList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!planes) dispatch(load_list_planes());
  }, []);

  return (
    <section>
      <section className={classes.planes}>
        {planes
          ? planes.map((plan, index) => {
              return <PlanCardPage {...plan} key={index} />;
            })
          : null}
      </section>
      <section>
        <h2>¡Seleccioná un plan y comenzá a entrenar!</h2>
        {/* <button>Suscribete</button> */}
      </section>
    </section>
  );
}

export default PlanList;
