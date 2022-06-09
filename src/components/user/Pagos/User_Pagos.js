import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userService from "../../../services/user.service";

function User_Pagos(params) {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const [suscripcion, setSuscripcion] = useState(null);
  const [months, setMonths] = useState(0);

  useEffect(() => {
    const susc = userService
      .get_Subscriptions_ByUserId(user.id)
      .then((response) => {
        setSuscripcion(response[0]);
        if (response[0]) {
          const from = response[0].startDate;
          const to = response[0].endDate;
          var f = new Date(from[0], from[1], from[2]);
          var t = new Date(to[0], to[1], to[2]);
          setMonths(t.getMonth() - f.getMonth());
        }
      });
  }, []);

  function volverHandler() {
    navigate("/user", { replace: true });
  }

  function fechaATexto(fecha) {
    return fecha[0] + "-" + fecha[1] + "-" + fecha[2];
  }

  function pagoHandler(params) {
    /**
     * Primero, envio os datos al back para que se crea la preferencia en mercado pago
     * y me devuelva el ID del mismo
     */
    // TODO cambiar endpoint y modo de envio de los datos

    // const preference = await axios
    //   .post("api/pay", {
    //     body: suscripcion,
    //     user: user.id
    //   })
    //   .json();

    /**
     * Luego de obtener el init_point, debo crear un script con el id, e insertarlo en el html
     */
    const preference = {
      preference_ID:
        "https://sandbox.mercadopago.com.ar/checkout/v1/redirect?pref_id=1135511061-0bce0629-12a8-476b-8f5b-af9b661fcf33",
    };
    if (preference.preference_ID) {
      var script = document.createElement("script");
      script.src = "https://sdk.mercadopago.com/js/v2";
      script.type = "text/javascript";
      script.async = true;
      script.dataset.preferenceId = preference.preference_ID;

      var link = document.createElement("p");
      document.getElementById("suscrip-section").innerHTML = "";
      document.getElementById("suscrip-section").appendChild(script);
    }
  }

  return (
    // TODO mostrar dos secciones: 1)- Si hay una suscripcion sin pagar - 2)- El historial de pagos (si no hay pagos, mostrar cartel)
    <section>
      <h1>Lista de Pagos</h1>
      <section>
        {suscripcion && suscripcion.length != 0 ? (
          <section>
            {!suscripcion.payment ? (
              <section>
                <p>¡No has pagado tu suscripción!</p>
                <p>Detalles:</p>
                <section>
                  <p>Plan {suscripcion.planDto.name}</p>
                  <p>Duracion de la suscripcion</p>
                  <p>
                    De: {fechaATexto(suscripcion.startDate)} - Hasta:{" "}
                    {fechaATexto(suscripcion.endDate)}
                  </p>
                  <p>Meses: {months}</p>
                  <p>Monto por mes: {suscripcion.planDto.price}</p>
                  <p>Monto Total: {months * suscripcion.planDto.price}</p>
                </section>
                <section id="suscrip-section">
                  {/* <button onClick={pagoHandler}>Empezar a pagar</button> */}
                  <p>
                    Link de pago: <a href="https://sandbox.mercadopago.com.ar/checkout/v1/redirect?pref_id=1135511061-0bce0629-12a8-476b-8f5b-af9b661fcf33" target="_self">Pagar</a>
                  </p>
                </section>
              </section>
            ) : (
              <input />
            )}
          </section>
        ) : (
          <p>¡No hay historial de pagos ni pagos pendientes!</p>
        )}

        <button onClick={volverHandler}>Volver</button>
      </section>
    </section>
  );
}

export default User_Pagos;
