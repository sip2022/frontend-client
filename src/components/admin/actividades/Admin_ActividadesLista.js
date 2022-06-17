import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { load_list_activity } from "../../../store/slices/activityList/activityListSlice";
import { eliminarActividad } from "../../../utils/crud";
import ImgLoading from "../../ui/ImgLoading";
import classes from "./ActividadesLista.module.css";

function ActividadItem({ actividad }) {
  const navigate = useNavigate();

  function editarHandler(params) {
    navigate("/admin/actividad/edit/" + params, { replace: true });
  }

  async function eliminarHandler(params) {
    const result = await eliminarActividad(params);
  }

  return (
    <section className={classes.actividadItem}>
      <h2>{actividad.name}</h2>
      <section>
        <button
          onClick={() => editarHandler(actividad.id)}
          className={classes.editarButton}
        >
          Editar
        </button>
        <button
          onClick={() => eliminarHandler(actividad.id)}
          className={classes.eliminarButton}
        >
          Eliminar
        </button>
      </section>
    </section>
  );
}

function ActividadesLista() {
  const dispatch = useDispatch();
  // const actividades = useSelector((state) => state.activityList.activityList);
  const { activityList: actividades, status } = useSelector(
    (state) => state.activityList
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!actividades) dispatch(load_list_activity());
  }, []);

  function altaClickHandler() {
    navigate("/admin/actividad/new", { replace: true });
  }

  function goBackHandler() {
    navigate("/admin", { replace: true });
  }

  return (
    <section className={classes.actividadesLista}>
      <h1>Actividades</h1>
      {status == "pending" && (
        <ImgLoading text={"Cargando lista de Actividades..."} />
      )}
      {status == "fulfilled" && (
        <section>
          <section className={classes.agregarSection}>
            <button
              className={classes.agregarButton}
              onClick={altaClickHandler}
            >
              Agregar Actividad
            </button>
          </section>
          <section>
            {actividades ? (
              actividades.map((actividad) => {
                return (
                  <ActividadItem actividad={actividad} key={actividad.id} />
                );
              })
            ) : (
              <h1>No hay actividades subidas!</h1>
            )}
          </section>
        </section>
      )}
      {status == "rejected" && (
        <p>No se ha podido cargar la lista de actividades</p>
      )}

      <section>
        <button onClick={goBackHandler}>Volver</button>
      </section>
    </section>
  );
}

export default ActividadesLista;
