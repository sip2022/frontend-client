import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import reduxService from "../../store/redux.service";

function PagoPlan(params) {
  const { id_plan } = useParams();

  const [plan, setPlan] = useState(null);
  const [confirmar, setConfirmar] = useState(false);
  const [error, setError] = useState(null);
  const [mesesCantidad, setMesesCantidad] = useState(0);

  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
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
              <p>Duración de la suscripción (meses): </p>
              <input id="input-meses" type="number" min="1" />
              {error && <p>{error}</p>}
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

  return (
    <section>
      <h2>Confirmación del pago</h2>
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
  );
}
