import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadActivityLista } from "../../../store/slices/activityList/activityListSlice";
import classes from "./ActividadesLista.module.css";

function NotAdminMessage(props) {
  return (
    <section>
      <h1>Usted no es admin! Sample Text</h1>
    </section>
  );
}

function ActividadItem({ actividad }) {
  function editarHandler() {
    alert("Editar " + actividad.name);
  }

  function eliminarHandler() {
    alert("Eliminando " + actividad.name);
  }

  return (
    <section className={classes.actividadItem}>
      <h2>{actividad.name}</h2>
      <section>
        <button className={classes.editarButton} onClick={editarHandler}>
          Editar
        </button>
        <button className={classes.eliminarButton} onClick={eliminarHandler}>
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

  useEffect(() => {
    // TODO esta es una funcion async, agregar estado de cargado y caso en el que no sea el admin, por el JWT
    dispatch(loadActivityLista());
    setIsAdmin(true);
  }, []);

  function clickHandler(params) {
    console.log(actividades);
  }

  function altaClickHandler() {
    alert("Alta de actividad");
  }

  return (
    <section>
      <button onClick={clickHandler}>Ver lista</button>
      {!isAdmin ? (
        <NotAdminMessage />
      ) : (
        <section>
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
              {actividades.map((actividad) => {
                return <ActividadItem actividad={actividad} />;
              })}
            </section>
          </section>
        </section>
      )}
    </section>
  );
}

export default ActividadesLista;
