import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userService from "../../../services/user.service";
import { cargarPago } from "../../../utils/crud";

const FORM_ID = "CHECKOUT_ID";

function User_Pagos(params) {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const [pagos, setPagos] = useState(null);

  // True -> mostrar "esperando que se inicie el pago..." en lugar del link
  const [esperandoPago, setEsperandoPago] = useState(false);

  const [suscripcion, setSuscripcion] = useState(null);
  const [months, setMonths] = useState(0);

  useEffect(() => {
    const susc = userService
      .get_Subscriptions_ByUserId(user.id)
      .then((response) => {
        if (response[0]) {
          setSuscripcion(response[0]);
          const from = response[0].startDate;
          const to = response[0].endDate;
          var f = new Date(from[0], from[1], from[2]);
          var t = new Date(to[0], to[1], to[2]);
          setMonths(t.getMonth() - f.getMonth());
        }
      });
  }, [user.id]);

  /**
   * Se espera el Init_point del back, y luego redirije automaticamente
   */
  async function pagoHandler(event) {
    event.preventDefault();
    setEsperandoPago(true);
    try {
      const susc_id = suscripcion.id;
      await cargarPago(susc_id).then((response) => {
        console.log(response);
        // navigate(response.sandboxInitPoint, { replace: true });
        window.location.replace(response.sandboxInitPoint);
      });
    } catch (error) {
      console.log(error);
      setEsperandoPago(false);
    }
  }

  function volverHandler() {
    navigate("/user", { replace: true });
  }

  function fechaATexto(fecha) {
    return fecha[0] + "-" + fecha[1] + "-" + fecha[2];
  }

  return (
    <section>
      <section>
        {suscripcion && suscripcion.length != 0 && (
          <section>
            <h1>Suscripción Pendiente</h1>
            {!suscripcion.payment && (
              <section>
                <p>¡No has pagado tu suscripción!</p>
                <p>Detalles:</p>
                <section>
                  <p>Plan {suscripcion.planDto.name}</p>
                  <p>
                    Duracion de la suscripcion: {months}{" "}
                    {months > 1 ? "meses" : "mes"}
                  </p>
                  <p>
                    De: {fechaATexto(suscripcion.startDate)} - Hasta:{" "}
                    {fechaATexto(suscripcion.endDate)}
                  </p>
                  <p>Monto por mes: {suscripcion.planDto.price}</p>
                  <p>Monto Total: {months * suscripcion.planDto.price}</p>
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
                      Esperando a que cargue el pago. Será automaticamente
                      redirigido.
                    </p>
                  )}
                </section>
              </section>
            )}
          </section>
        )}

        <h1>Historial de Pagos</h1>
        {/* TODO listar los pagos del usuario */}
        {!pagos ? (
          <p>¡No has realizado nigún pago!</p>
        ) : (
          <section>
            {pagos.map((pago, index) => {
              return <PagoCard id={pago.id} key={index} />;
            })}
          </section>
        )}

        <button onClick={volverHandler}>Volver</button>
      </section>
    </section>
  );
}

export default User_Pagos;

function PagoCard({ id }) {
  return (
    <section>
      <p>Pago: {id}</p>
    </section>
  );
}
