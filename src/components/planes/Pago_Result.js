import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import reduxService from "../../store/redux.service";
import planListSlice, {
  load_list_planes,
} from "../../store/slices/planList/planListSlice";

export default function Pago_Result(params) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id_plan, result } = useParams();
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
        {result == "success" && <p>Pago exitoso</p>}
        {result == "failure" && <p>Pago fallido</p>}
        {result == "pending" && <p>Pago pendiente</p>}
      </section>
      <section>
        <button onClick={volverHandler}>Ir a Inicio</button>
      </section>
    </section>
  );
}
