import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import reduxService from "../../store/redux.service";
import { load_list_planes } from "../../store/slices/planList/planListSlice";

export default function Pago_Result(params) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id_plan, result } = useParams();
  const user = useSelector((state) => state.user);
  const planes = useSelector((state) => state.planList.planList);
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    if (planes) {
      dispatch(load_list_planes());
    }
    const plan = reduxService.get_Plan_byID(id_plan);
    setPlan(plan);
    // TODO enviar al back el resultado
  }, []);

  function volverHandler() {
    navigate("/", { replace: true });
  }

  return (
    <section>
      <section>
        {result == "success" && (
          <Display_Result user={user} plan={plan} success />
        )}
        {result == "failure" && (
          <Display_Result user={user} plan={plan} failure />
        )}
        {result == "pending" && (
          <Display_Result user={user} plan={plan} pending />
        )}
      </section>
      <section>
        <button onClick={volverHandler}>Volver a Inicio</button>
      </section>
    </section>
  );
}

function Display_Result({ user, plan, monto, success, failure, pending }) {
  function reintentoHandler() {
    // TODO reintenta realizar el pago
  }
  return (
    <section>
      {success && <h2>Pago Realizado</h2>}
      {failure && <h2>No se ha podido procesar tu pago</h2>}
      {pending && <h2>El pago está en proceso</h2>}

      <section>
        <p>Nombre: {user.firtsName + " " + user.lastName}</p>
        <p>Plan: {plan.name}</p>
        <p>Monto pagado: {monto}</p>
      </section>
      {failure && (
        <section>
          <button onClick={reintentoHandler}>Reintentar</button>
        </section>
      )}
    </section>
  );
}
