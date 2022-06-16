import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { load_list_activity } from "../../store/slices/activityList/activityListSlice";
import ActividadCard from "../ui/ActividadCard";
import ImgLoading from "../ui/ImgLoading";
import classes from "./ActividadesList.module.css";

function List_Actividades() {
  const { activityList: actividades, status } = useSelector(
    (state) => state.activityList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!actividades) dispatch(load_list_activity());
  }, []);

  return (
    <section>
      <h1>Disfruta nuestras actividades</h1>
      {status == "pending" && (
        <ImgLoading text="Cargando lista de Actividades.." />
      )}
      {status == "fulfilled" && (
        <section className={classes.section_actividades}>
          {actividades
            ? actividades.map((actividad, index) => {
                return <ActividadCard actividad={actividad} key={index} />;
              })
            : null}
        </section>
      )}
      {status == "rejected" && <p>No se han podido cargar las actividades</p>}
    </section>
  );
}

export default List_Actividades;
