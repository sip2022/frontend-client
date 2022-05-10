import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadActivityLista } from "../../../store/slices/activityList/activityListSlice";

function NotAdminMessage(props) {
  return (
    <section>
      <h1>Usted no es admin! Sample</h1>
    </section>
  );
}

function actividadItem(props) {
  
  return <section>
    
  </section>
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
      {!isAdmin ? (
        <NotAdminMessage />
      ) : (
        <section>
          <h1>Actividades</h1>
          <section>
            <section>
              <button onClick={altaClickHandler}>Agregar Actividad</button>
            </section>
            <section>
              {actividades.map((actividad, index) => {

              })}
            </section>
          </section>
        </section>
      )}
    </section>
  );
}

export default ActividadesLista;
