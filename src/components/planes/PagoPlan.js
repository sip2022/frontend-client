import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import reduxService from "../../store/redux.service";          

function PagoPlan(params) {
  const { id_plan } = useParams();

  const [plan, setPlan] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.firstName) navigate("/", { replace: true });
    const plan_rec = reduxService.get_Plan_byID(id_plan);
    setPlan(plan_rec);
  }, []);

  function pagoHandler(params) {
    alert("Pagar?")
    try {
      
    } catch (error) {
      console.log(error);
    }
  }

  function cancelarHandler(params) {
    navigate("/planes", {replace: true});
  }

  return (
    <section>
      {plan && (
        <section>
          <h2>Pago Suscripcion</h2>
          <section>
            <p>{user.firstName + " " + user.lastName}</p>
            <p>Plan {plan.name}</p>
            <p>Valor a pagar: {plan.price}</p>
          </section>
          <section>
            <button onClick={pagoHandler}>Pagar</button>
            <button onClick={cancelarHandler}>Cancelar</button>
          </section>
        </section>
      )}
    </section>
  );
}

export default PagoPlan;
