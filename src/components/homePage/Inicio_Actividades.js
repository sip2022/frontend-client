import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { load_list_activity } from "../../store/slices/activityList/activityListSlice";
import ActividadCard from "../ui/ActividadCard";
import ImgLoading from "../ui/ImgLoading";
import classes from "./Actividades.module.css";

function Inicio_Actividades() {
  const { activityList: actividades, status } = useSelector(
    (state) => state.activityList
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!actividades) dispatch(load_list_activity());
  }, []);

  function verActividadesHandler(event) {
    event.preventDefault();
    navigate("/actividades", { replace: true });
  }

  return (
    <section className={classes.actividades_section}>
      <section>
        <h2>Actividades</h2>
      </section>
      {status == "pending" && <ImgLoading />}
      {status == "fulfilled" && (
        <section>
          <section className={classes.actividades_list}>
            {actividades
              ? actividades.slice(0, 3).map((actividad, index) => {
                  return <ActividadCard actividad={actividad} key={index} />;
                })
              : null}
            <section
              className={classes.card_verMas}
              onClick={verActividadesHandler}
            >
              Ver Mas Actividades
            </section>
          </section>
        </section>
      )}
      {status == "rejected" && <p>No han podido cargarse las actividades.</p>}
    </section>
  );
}

export default Inicio_Actividades;
