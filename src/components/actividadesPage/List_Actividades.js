import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { set_ActivityLista } from "../../store/slices/activityList/activityListSlice";
import { loadActivityList } from "../../utils/crud";
import ActividadCard from "../ui/ActividadCard";
import classes from "./ActividadesList.module.css";

function List_Actividades(props) {
  const actividades = useSelector((state) => state.activityList.activityList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // TODO funcion loadActividades
    async function loadActividades() {
      try {
        if (!actividades) {
          var lista = await loadActivityList();
          return lista;
        } else {
          throw "Exception";
        }
      } catch (error) {
        throw new Error("Actividades already loaded");
      }
    }
    loadActividades()
      .then((data) => {
        console.log(data);
        dispatch(set_ActivityLista(data));
      })
      .catch((error) => {
        // Nothing
      });
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
