import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userService from "../../../services/user.service";
import {
  load_user_turnos,
  setearUserTurnos,
} from "../../../store/slices/userData/userDataSlice";
import { cancelar_reserva } from "../../../utils/crud";
import { translateDay } from "../../../utils/translation";
import GeneralModal from "../../ui/GeneralModal";
import classes from "./User_Turnos.module.css";

function UserTurnos(params) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(load_user_turnos());
  }, []);

  function volverHandler(params) {
    navigate("/user", { replace: true });
  }

  return (
    <section>
      <h1>Mis Reservas</h1>
      {user.turnos && user.turnos.length != 0 ? (
        user.turnos.map((turno, index) => {
          return (
            <TurnoCard
              id_user={user.id}
              id_class={turno.availableClass.id}
              actividadName={turno.availableClass.activityDto.name}
              {...turno.availableClass.timeslotDto}
              key={index}
            />
          );
        })
      ) : (
        <p>¡No has realizado ninguna reserva!</p>
      )}
      <section>
        <button onClick={volverHandler} className={classes.boton}>
          Volver
        </button>
      </section>
    </section>
  );
}

export default UserTurnos;

function TurnoCard({
  id_class,
  id_user,
  dayOfWeek,
  startTime,
  endTime,
  actividadName,
}) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  async function clickHandler() {
    await cancelar_reserva(id_class, id_user)
      .then((response) => {
        setShowModal(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function closeModal() {
    userService.get_Turnos_ByUserId(id_user).then((response) => {
      dispatch(setearUserTurnos(response));
    });
    setShowModal(false);
  }

  return (
    <section className={classes.section_turno}>
      <p>
        {translateDay(dayOfWeek) +
          " " +
          startTime[0] +
          ":" +
          startTime[1] +
          " - " +
          endTime[0] +
          ":" +
          endTime[1] +
          " " +
          actividadName}
      </p>
      <section>
        <button onClick={clickHandler} className={classes.boton}>
          Anular Reserva
        </button>
      </section>
      {showModal && (
        <GeneralModal
          text="La reserva se ha anulado exitosamente"
          callbackClose={closeModal}
        />
      )}
    </section>
  );
}
