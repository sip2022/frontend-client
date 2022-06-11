import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import reduxService from "../../store/redux.service";
import { load_list_planes } from "../../store/slices/planList/planListSlice";
import { suscribir_Plan } from "../../utils/crud";
import classes from "./PagoPlan.module.css";

function PagoPlan() {
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
    if (!user.id) navigate("/login", { replace: true });
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

  function cancelarHandler() {
    navigate("/planes", { replace: true });
  }

  function ocultarConfirmacion() {
    setConfirmar(false);
  }

  return (
    <section>
      {plan && (
        <section>
          <h1>Suscripcion a Plan</h1>
          <section className={classes.infoPlan_section}>
            <p>Plan {plan.name}</p>
            <p>Limite de actividades para reservar: {plan.activitiesLimit}</p>
            <p>Valor por mes: ${plan.price}</p>
            <section>
              <p>Indique cuantos meses quiere que dure la suscripción</p>
              <p>La cantidad de meses debe ser 1 o mayor</p>
              <input id="input-meses" type="number" min="1" />
              {error && <p className={classes.errorMessage}>{error}</p>}
            </section>
          </section>
          <section className={classes.infoPlan_botones}>
            <button onClick={suscribeHandler} className={classes.boton}>Suscribirse</button>
            <button onClick={cancelarHandler} className={classes.boton}>Cancelar</button>
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
          id_plan={id_plan}
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
  id_plan,
}) {
  const navigate = useNavigate();
  const [valorTotal, setValorTotal] = useState(0);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setValorTotal(valorXMes * meses);
  }, []);

  async function pagoHandler() {
    try {
      await suscribir_Plan(user.id, id_plan, nombrePlan, meses);
      alert(
        "Se ha completado la suscripción.\nRevise su página de pagos para terminar el pago de la suscripción."
      );
      navigate("/user/pagos", { replace: true });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className={classes.confirmacion_Section}>
      <section className={classes.confirmacion_Display}>
        <h2>Confirmación de la Suscripción</h2>
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
          <p>Valor Total (pesos): ${valorTotal}</p>
        </section>
        <section>
          <p>Cantidad de meses: {meses}</p>
        </section>
        <section>
          <p>* Recuerde que es un solo pago, por el monto total.</p>
        </section>
        <section id="suscrip-section" className={classes.confirmacion_botones}>
          <button onClick={pagoHandler} className={classes.boton}>Suscribirse</button>
        </section>
        <section>
          <button onClick={callbackSetConfirmar} className={classes.boton}>Cancelar</button>
        </section>
      </section>
    </section>
  );
}
