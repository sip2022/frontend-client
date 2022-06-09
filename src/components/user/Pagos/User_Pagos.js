import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userService from "../../../services/user.service";

function User_Pagos(params) {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const [pagos, setPagos] = useState(null);

  const [suscripcion, setSuscripcion] = useState(null);
  const [months, setMonths] = useState(0);
  const [linkPago, setLinkPago] = useState("");

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

          // TODO
          /**
           * Enviar el id de la suscripción al back:
           * response[0].id
           * para generar el pago, y el init_point que devuelva lo inserto en el anchor
           */
          const link =
            "https://sandbox.mercadopago.com.ar/checkout/v1/redirect?pref_id=1135511061-0bce0629-12a8-476b-8f5b-af9b661fcf33";
          setLinkPago(link);
        }
      });
  }, []);

  function volverHandler() {
    navigate("/user", { replace: true });
  }

  function fechaATexto(fecha) {
    return fecha[0] + "-" + fecha[1] + "-" + fecha[2];
  }

  return (
    // TODO mostrar dos secciones: 1)- Si hay una suscripcion sin pagar - 2)- El historial de pagos (si no hay pagos, mostrar cartel)
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
                <section id="suscrip-section">
                  {linkPago ? (
                    <section>
                      <p>
                        Link de pago:{" "}
                        <a id="link_pago" href={linkPago} target="_self">
                          Click aquí para pagar
                        </a>
                      </p>
                      <p>* Recuerde que es un solo pago, por el monto total.</p>
                    </section>
                  ) : (
                    <p>
                      Todavía no se ha cargado el link de pago. Por favor,
                      espere...
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
