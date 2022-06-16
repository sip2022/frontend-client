import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { load_list_planes } from "../../store/slices/planList/planListSlice";
import ImgLoading from "../ui/ImgLoading";
import classes from "./Planes.module.css";

function PlanCard({ plan }) {
  // plan -> texto, imagen, key

  const navigate = useNavigate();

  function clickHandler() {
    navigate("/planes/" + plan.id);
  }

  return (
    <section className={classes.plan} onClick={clickHandler} key={plan.key}>
      {/* <img className={classes.plan_image} src={plan.imagen} alt="logo plan" /> */}
      <h3 className={classes.planes_h3}>{plan.name}</h3>
    </section>
  );
}

function Planes() {
  // const planes = useSelector((state) => state.planList.planList);
  const { planList: planes, status } = useSelector((state) => state.planList);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!planes) dispatch(load_list_planes());
  }, []);

  return (
    <section className={classes.planes_section}>
      <section className={classes.planes_text}>
        <p className={classes.planes_p}>Conoce nuestros</p>
        <h3 className={classes.planes_h3}>Planes</h3>
      </section>

      {status == "pending" && <ImgLoading />}
      {status == "fulfilled" && (
        <section>
          {planes
            ? planes.map((plan, index) => {
                return <PlanCard plan={plan} key={index} />;
              })
            : null}
        </section>
      )}
      {status == "rejected" && <p>No se han podido cargar los planes.</p>}
    </section>
  );
}

export default Planes;
