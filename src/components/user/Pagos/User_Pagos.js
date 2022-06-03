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
        console.log(response[0]);
        setSuscripcion(response[0]);
        getMonths();
      });
  }, []);

  function volverHandler() {
    navigate("/user", { replace: true });
  }

  function fechaATexto(fecha) {
    return fecha[0] + "-" + fecha[1] + "-" + fecha[2];
  }

  function getMonths() {
    const from = suscripcion.startDate;
    const to = suscripcion.endDate;
    var f = new Date(from[0], from[1], from[2]);
    var t = new Date(to[0], to[1], to[2]);
    setMonths(t.getMonth() - f.getMonth());
  }

  return (
    <section>
      <h1>Lista de Pagos</h1>
      <section>
        {suscripcion && (
          <section>
            {!suscripcion.payment ? (
              <section>
                <p>¡No has pagado tu suscripción!</p>
                <p>Detalles:</p>
                <section>
                  <p>Duracion de la suscripcion</p>
                  <p>
                    De: {fechaATexto(suscripcion.startDate)} - Hasta:{" "}
                    {fechaATexto(suscripcion.endDate)}
                  </p>
                  <p>Meses: {months}</p>
                  <p>Monto por mes: {suscripcion.planDto.price}</p>
                  <p>Monto Total: {months * suscripcion.planDto.price}</p>
                </section>
                <section>
                  <button>Empezar a pagar</button>
                </section>
              </section>
            ) : <input />}
          </section>
        )}

        <button onClick={volverHandler}>Volver</button>
      </section>
    </section>
  );
}

export default User_Pagos;
