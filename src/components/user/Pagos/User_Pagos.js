import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userService from "../../../services/user.service";
import { cargarPago } from "../../../utils/crud";
import classes from "./User_Pagos.module.css";

const FORM_ID = "CHECKOUT_ID";

function fechaATexto(fecha) {
  return fecha[0] + "-" + fecha[1] + "-" + fecha[2];
}

export default function User_Pagos(params) {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const [pagos, setPagos] = useState([]);
  const [subscriptionDebts, setSubscriptionDebts] = useState([]);

  useEffect(() => {
    if (user.id) {
      try {
        userService.get_Subscriptions_ByUserId(user.id).then((response) => {
          response.map((sub) => {
            userService.get_Payment_ById(sub.paymentId).then((response) => {
              if (response.paymentStatuses.length > 0) {
                // El pago tuvo un resultado
                const currentPay = response.paymentStatuses.find((pay) => {
                  if (pay.current) return pay;
                });
                let newPay = {
                  ...response,
                  plan: sub.planDto.name,
                  status: currentPay.paymentStatus,
                };
                if (currentPay.paymentStatus == "rejected")
                  setSubscriptionDebts((prev) => [...prev, sub]);
                setPagos((prev) => [...prev, newPay]);
              } else {
                // No está pagado
                setSubscriptionDebts((prev) => [...prev, sub]);
              }
            });
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [user.id]);

  function volverHandler() {
    navigate("/user", { replace: true });
  }

  return (
    <section>
      <section>
        {subscriptionDebts.length > 0 && (
          <section>
            <h1>Suscripciones Pendientes</h1>
            {subscriptionDebts.map((sub, index) => {
              return <SubscriptionDebtCard subscription={sub} key={index} />;
            })}
          </section>
        )}

        <h1>Historial de Pagos</h1>
        {/* TODO listar los pagos del usuario */}
        {!pagos.length > 0 ? (
          <p>¡No has realizado nigún pago!</p>
        ) : (
          <section>
            {pagos.map((pago, index) => {
              return <PagoCard pago={pago} index={index + 1} key={index} />;
            })}
          </section>
        )}

        <button onClick={volverHandler} className={classes.boton}>
          Volver
        </button>
      </section>
    </section>
  );
}

/*----------------------------------------------------------------------------------------------------*/

function PagoCard({ pago, index }) {
  return (
    <section className={`${classes.pago_card} ${classes[pago.status]}`}>
      <p>
        Pago #{index} - Plan: {pago.plan} - Fecha:{" "}
        {fechaATexto(pago.paymentDate)} - Monto pagado: ${pago.amountPaid}
      </p>
      {pago.status == "pending" && (
        <p>El pago sigue en proceso de confirmación por MercadoPago</p>
      )}
      {pago.status == "rejected" && (
        <p>El pago no pudo concretarse<br/>Vuelva a intentalo</p>
      )}
    </section>
  );
}

/*----------------------------------------------------------------------------------------------------*/

/**
 * Tarjeta para mostrar suscripciones sin pagar
 */
function SubscriptionDebtCard({ subscription }) {
  // True -> mostrar "esperando que se inicie el pago..." en lugar del link
  const [esperandoPago, setEsperandoPago] = useState(false);
  const [months, setMonths] = useState(0);

  useEffect(() => {
    const from = subscription.startDate;
    const to = subscription.endDate;
    var f = new Date(from[0], from[1], from[2]);
    var t = new Date(to[0], to[1], to[2]);
    setMonths(t.getMonth() - f.getMonth());
  }, []);

  /**
   * Se espera el Init_point del back, y luego redirije automaticamente
   */
  async function pagoHandler(event) {
    event.preventDefault();
    setEsperandoPago(true);
    try {
      const susc_id = subscription.id;
      await cargarPago(susc_id).then((response) => {
        // navigate(response.sandboxInitPoint, { replace: true });
        window.location.replace(response.sandboxInitPoint);
      });
    } catch (error) {
      console.log(error);
      alert("Hubo un problema con el pago. Vuelva a intentarlo más tarde.");
      setEsperandoPago(false);
    }
  }

  return (
    <section className={classes.sub_debt_card}>
      <p>¡No has pagado tu suscripción!</p>
      <p>Detalles:</p>
      <section>
        <p>Plan {subscription.planDto.name}</p>
        <p>
          Duracion de la suscripcion: {months} {months > 1 ? "meses" : "mes"}
        </p>
        <p>
          De: {fechaATexto(subscription.startDate)} - Hasta:{" "}
          {fechaATexto(subscription.endDate)}
        </p>
        <p>Monto por mes: {subscription.planDto.price}</p>
        <p>Monto Total: {months * subscription.planDto.price}</p>
      </section>
      <section>
        {!esperandoPago ? (
          <section>
            <p>
              <a id="link_pago" href="#" onClick={pagoHandler}>
                Click aquí para pagar
              </a>
            </p>
            <p>* Recuerde que es un solo pago, por el monto total.</p>
          </section>
        ) : (
          <p>
            Esperando a que cargue el pago. Será automaticamente redirigido.
          </p>
        )}
      </section>
    </section>
  );
}
