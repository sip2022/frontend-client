import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { load_list_planes } from "../../store/slices/planList/planListSlice";
import ImgLoading from "../ui/ImgLoading";
import classes from "./PlanList.module.css";

// Dummy data sobre los planes
// TODO traerlos desde el Back cuando se implemente.

function PlanCardPage({ id, name, activitiesLimit }) {
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

function PlanList() {
  const { planList: planes, status } = useSelector((state) => state.planList);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      if (!planes) dispatch(load_list_planes());
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <section>
      <h1>Encontra el plan para vos!</h1>
      {status == "pending" && (
        <ImgLoading text={"Cargando lista de Planes..."} />
      )}
      {status == "fulfilled" && (
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
          </section>
        </section>
      )}
      {status == "rejected" && (
        <p>No se han podido cargar la lista de planes</p>
      )}
    </section>
  );
}

export default PlanList;
