import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { load_list_planes } from "../../store/slices/planList/planListSlice";
import GeneralModal from "../ui/GeneralModal";
import ImgLoading from "../ui/ImgLoading";
import classes from "./PlanList.module.css";

// Dummy data sobre los planes
// TODO traerlos desde el Back cuando se implemente.

function PlanCardPage({ id, name, activitiesLimit }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.user);

  function clickHandler(event) {
    event.preventDefault();
    if (user.id) navigate("/planes/" + id, { replace: true });
    else setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <section className={classes.singlePlan} id={id} onClick={clickHandler}>
      <section>
        <h2>{name}</h2>
        <ul>
          <li>{"Limite de reservas: " + activitiesLimit}</li>
        </ul>
      </section>
      {showModal && (
        <GeneralModal
          text={"Debes registrarte antes de poder suscribirte a un plan"}
          callbackClose={closeModal}
        />
      )}
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
      <h1>¡Encontra el plan para vos!</h1>
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
