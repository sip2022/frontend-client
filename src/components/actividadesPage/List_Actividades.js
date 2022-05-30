import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  load_list_activity,
} from "../../store/slices/activityList/activityListSlice";
import ActividadCard from "../ui/ActividadCard";
import classes from "./ActividadesList.module.css";

function List_Actividades() {
  const actividades = useSelector((state) => state.activityList.activityList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!actividades) dispatch(load_list_activity());
  }, []);

  return (
    <section>
      <h1>Disfruta nuestras actividades</h1>
      <section className={classes.section_actividades}>
        {actividades
          ? actividades.map((actividad, index) => {
              return <ActividadCard actividad={actividad} key={index} />;
            })
          : null}
      </section>
    </section>
  );
}

export default List_Actividades;
