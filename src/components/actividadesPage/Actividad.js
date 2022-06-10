import { useEffect, useState } from "react";
import { ReactReduxContext, useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import userService from "../../services/user.service";
import reduxService from "../../store/redux.service";
import { load_list_activity } from "../../store/slices/activityList/activityListSlice";
import { load_user_turnos } from "../../store/slices/userData/userDataSlice";
import { reservar_Clase } from "../../utils/crud";
import { translateDay } from "../../utils/translation";
import classes from "./Actividad.module.css";

function Actividad(props) {
  const { id_act } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const actividades = useSelector((state) => state.activityList.activityList);
  const estado = useSelector((state) => state.activityList.status);
  const user = useSelector((state) => state.user);
  const [availableClasses, setAvailableClasses] = useState(null);

  const [error, setError] = useState("");
  const [appearReserva, setAppearReserva] = useState(false);

  const [contenido, setContenido] = useState({
    id: "",
    name: "",
    attendeesLimit: "",
    basePrice: 0,
    professor: {},
  });
  const [reserva, setReserva] = useState({});
  const [amountReserved, setAmountReserved] = useState(0);

  useEffect(() => {
    dispatch(load_user_turnos());
    if (!actividades) dispatch(load_list_activity());
  }, []);

  useEffect(() => {
    let unmounted = false;
    if (actividades) {
      // Obtener los horarios de clases (available-classes) de la actividad (tengo el id)
      userService.get_Classes_ByActId(id_act).then((response) => {
        if (response && response.length != 0) {
          setAvailableClasses(response);
        }
      });
      // Conseguir la actividad elegida (tengo el id)
      const actividadElegida = actividades.find((act) => {
        return act.id == id_act;
      });
      if (!unmounted) setContenido(actividadElegida);
    }

    return () => {
      unmounted = true;
    };
  }, [actividades]);

  async function reservarHandler(event) {
    clearError();
    if (user.id) {
      try {
        var ele = document.getElementsByName("horario");
        let hor_selected = null;
        for (let i = 0; i < ele.length; i++) {
          if (ele[i].checked) hor_selected = ele[i];
        }
        if (hor_selected) {
          // get ID of Available Class selected (radio buttons) and recover the available class
          const id_clas_select = hor_selected.getAttribute("id_class");
          const reserva_elegida = availableClasses.find((clas) => {
            return clas.id == id_clas_select;
          });
          // get atendees reserved amount
          setAmountReserved(
            await userService.get_reservation_atendeesAmount(id_clas_select)
          );
          setReserva(reserva_elegida);
          setAppearReserva(true);
        } else {
          setError(
            "Para reservar la actividad, seleccione primero uno de los horarios mostrados"
          );
        }
      } catch (error) {
        setError(
          "Algo salió mal con la solicitud al servidor. Vuelva a intentarlo mas tarde."
        );
      }
    } else {
      if (window.confirm("Para reservar una actividad, primero debes loguearte!")){
        navigate("/login", { replace: true });
      }
    }
  }

  function closeWindowHandler() {
    setAppearReserva(false);
  }

  function clearError() {
    setError("");
  }

  function setErrorText(text) {
    setError(text);
  }

  function volverHandler() {
    navigate("/actividades", { replace: true });
  }

  return (
    <section className={classes.actividad_section} id="actividad_section">
      <section>
        <h1>{contenido.name}</h1>
      </section>
      <section className={classes.section_horarios}>
        <h2>Horarios</h2>

        {availableClasses ? (
          availableClasses.map((clas, index) => {
            const time = clas.timeslotDto;
            return (
              <section className={classes.horario_radio} key={index}>
                <input
                  type="radio"
                  name="horario"
                  id={"horario_" + index}
                  id_class={clas.id}
                />
                <label htmlFor={"horario" + index}>
                  {translateDay(time.dayOfWeek) +
                    ": " +
                    time.startTime[0] +
                    ":" +
                    time.startTime[1] +
                    " - " +
                    time.endTime[0] +
                    ":" +
                    time.endTime[1]}
                </label>
              </section>
            );
          })
        ) : (
          <p>No hay clases establecidas para esta actviidad.</p>
        )}
      </section>
      {availableClasses && availableClasses != [] && (
        <section>
          <button onClick={reservarHandler} className={classes.boton}>Reservar</button>
        </section>
      )}

      <section>
        <button onClick={volverHandler} className={classes.boton}>Volver</button>
      </section>
      {appearReserva && (
        <DisplayReserva
          callbackCloseWindow={closeWindowHandler}
          callbackSetError={setErrorText}
          actividad={contenido}
          reserva={reserva}
          amountReserved={amountReserved}
          id_clas={reserva.id}
          id_user={user.id}
        />
      )}
      {error && (
        <section>
          <p>{error}</p>
        </section>
      )}
    </section>
  );
}

export default Actividad;

/**
 * Display de la Reserva
 */

function DisplayReserva({
  actividad,
  reserva,
  amountReserved,
  callbackCloseWindow,
  callbackSetError,
  id_clas,
  id_user,
}) {
  const [
    {
      act_name,
      startTime,
      endTime,
      dayOfWeek,
      attendeesLeft,
      attendeesReserved,
    },
    setContenido,
  ] = useState({
    act_name: "",
    startTime: "",
    endTime: "",
    dayOfWeek: "",
    attendeesLeft: 0,
    attendeesReserved: 0,
  });

  const [canReserve, setCanReserve] = useState(null);
  const [alreadyReserved, setAlreadyReserved] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (reduxService.check_Class_ofUser_byClassID(id_clas))
      setAlreadyReserved(true);
    // buscar si id_clas está reservada en por el usuario
    const att_left = actividad.attendeesLimit - amountReserved;
    const newContenido = {
      act_name: actividad.name,
      startTime: reserva.timeslotDto.startTime,
      endTime: reserva.timeslotDto.endTime,
      dayOfWeek: reserva.timeslotDto.dayOfWeek,
      attendeesLeft: att_left,
      attendeesReserved: amountReserved,
    };
    setContenido(newContenido);
    if (att_left > 0) setCanReserve(true);
    setLoaded(true);
  }, []);

  async function submitHandler() {
    try {
      if (canReserve) {
        await reservar_Clase(id_clas, id_user);
        alert("¡Reserva exitosa!\nSe listará en tu sección de reservas.");
        navigate("/user/reservas", { replace: true });
      } else {
        callbackSetError("No quedan vacantes disponibles para esta clase.");
      }
    } catch (error) {
      callbackSetError(
        "Hubo un problema al enviar su formulario de reserva. Vuelva a intentar mas tarde."
      );
    } finally {
      callbackCloseWindow();
    }
  }

  return (
    <section className={classes.reserva_Section}>
      <section className={classes.reserva_Display}>
        {loaded ? (
          <section>
            <h2>{act_name}</h2>
            <section>
              <p>Gimnasio GEMINIS CLUB</p>
              <p>
                {translateDay(dayOfWeek) +
                  ": " +
                  startTime[0] +
                  ":" +
                  startTime[1] +
                  " - " +
                  endTime[0] +
                  ":" +
                  endTime[1]}
              </p>
            </section>
            <section>
              <section>
                <p>{attendeesLeft}</p>
                <p>Lugares Disponibles</p>
              </section>
              <section>
                <p>{attendeesReserved}</p>
                <p>Reservas Realizadas</p>
              </section>
            </section>
            <section>
              {alreadyReserved && <p>Ya tienes esta clase reservada</p>}
              {!alreadyReserved && canReserve && (
                <button onClick={submitHandler}>Reservar</button>
              )}
              {!alreadyReserved && !canReserve && (
                <section>
                  <p>
                    No puede reservar en este horario, ya que no quedan lugares
                    disponibles
                  </p>
                </section>
              )}
            </section>
            <section>
              <button onClick={callbackCloseWindow}>Cancelar</button>
            </section>
          </section>
        ) : (
          <p>Cargando...</p>
        )}
      </section>
    </section>
  );
}
