import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import reduxService from "../../store/redux.service";
import { load_list_planes } from "../../store/slices/planList/planListSlice";
import classes from "./PagoPlan.module.css";

function PagoPlan(params) {
  const { id_plan } = useParams();

  const [plan, setPlan] = useState(null);
  const [confirmar, setConfirmar] = useState(false);
  const [error, setError] = useState(null);
  const [mesesCantidad, setMesesCantidad] = useState(0);

  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(load_list_planes());
    if (!user.firstName) navigate("/login", { replace: true });
    const plan_rec = reduxService.get_Plan_byID(id_plan);
    setPlan(plan_rec);
  }, []);

  function suscribeHandler() {
    const mesesCant = document.getElementById("input-meses").value;
    if (mesesCant < 1) setError("El número de meses debe ser 1 o mayor");
    else {
      setMesesCantidad(mesesCant);
      setConfirmar(true);
    }
  }

  function cancelarHandler(params) {
    navigate("/planes", { replace: true });
  }

  function ocultarConfirmacion() {
    setConfirmar(false);
  }

  return (
    <section>
      {plan && (
        <section>
          <h2>Suscripcion a Plan</h2>
          <section>
            <p>Plan {plan.name}</p>
            <p>Valor por mes: ${plan.price}</p>
            <section>
              <p>Indique cuantos meses quiere que dure la suscripción</p>
              <p>La cantidad de meses debe ser 1 o mayor</p>
              <input id="input-meses" type="number" min="1" />
              {error && <p className={classes.errorMessage}>{error}</p>}
            </section>
          </section>
          <section>
            <button onClick={suscribeHandler}>Suscribirse</button>
            <button onClick={cancelarHandler}>Cancelar</button>
          </section>
        </section>
      )}
      {confirmar && (
        <ConfirmacionPago
          nombrePlan={plan.name}
          valorXMes={plan.price}
          meses={mesesCantidad}
          nombreUsuario={user.firstName + " " + user.lastName}
          callbackSetConfirmar={ocultarConfirmacion}
        />
      )}
    </section>
  );
}

export default PagoPlan;

function ConfirmacionPago({
  nombrePlan,
  valorXMes,
  meses,
  nombreUsuario,
  callbackSetConfirmar,
}) {
  const navigate = useNavigate();
  const [valorTotal, setValorTotal] = useState(0);

  useEffect(() => {
    setValorTotal(valorXMes * meses);
  }, []);

  function pagoHandler() {}

  function getActualDate() {
    const date = new Date();
    return date.toISOString().substring(0,10)
  }

  return (
    <section className={classes.confirmacion_Section}>
      <section className={classes.confirmacion_Display}>
        <h2>Confirmación de la suscripción</h2>
        <section>
          <p>Usuario: {nombreUsuario}</p>
        </section>
        <section>
          <p>Plan: {nombrePlan}</p>
        </section>
        <section>
          <p>Valor por Mes (pesos): ${valorXMes}</p>
        </section>
        <section>
          <p>Valor por Total (pesos): ${valorTotal}</p>
        </section>
        <section>
          <p>Cantidad de meses: {meses}</p>
        </section>
        <section>
          <button onClick={pagoHandler}>Suscribirse</button>
          <button onClick={callbackSetConfirmar}>Cancelar</button>
        </section>
      </section>
    </section>
  );
}
