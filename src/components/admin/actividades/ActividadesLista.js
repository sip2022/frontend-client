import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loadActivityLista,
  setActivityLista,
} from "../../../store/slices/activityList/activityListSlice";
import { eliminarActividad, loadActivityList } from "../../../utils/crud";
import classes from "./ActividadesLista.module.css";

function NotAdminMessage(props) {
  return (
    <section>
      <h1>Usted no es admin! Sample Text</h1>
    </section>
  );
}

function ActividadItem({ actividad }) {

  const navigate = useNavigate();

  function editarHandler(params) {
    navigate("/admin/actividad/edit/" + params, {replace: true})
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

function ActividadesLista(props) {
  const dispatch = useDispatch();
  const actividades = useSelector((state) => state.activityList.activityList);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO esta es una funcion async, agregar estado de cargado y caso en el que no sea el admin, por el JWT
    async function loadActividades() {
      if (!actividades) {
        const lista = await loadActivityList();
        dispatch(setActivityLista(lista));
      }
    }
    loadActividades();
    setIsAdmin(true);
  }, []);

  function altaClickHandler() {
    navigate("/admin/actividad/new", { replace: true });
  }

  return (
    <section>
      {!isAdmin ? (
        <NotAdminMessage />
      ) : (
        <section className={classes.actividadesLista}>
          <h1>Actividades</h1>
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
        </section>
      )}
    </section>
  );
}

export default ActividadesLista;
