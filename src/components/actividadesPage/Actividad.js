import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import userService from "../../services/user.service";
import {
  load_list_activity,
} from "../../store/slices/activityList/activityListSlice";
import { reservar_Clase } from "../../utils/crud";
import { translateDay } from "../../utils/translation";
import classes from "./Actividad.module.css";

function Actividad(props) {
  const { id_act } = useParams();
  const dispatch = useDispatch();

  const actividades = useSelector((state) => state.activityList.activityList);
  const estado = useSelector((state) => state.activityList.status);
  const usuario = useSelector((state) => state.user);
  const [availableClasses, setAvailableClasses] = useState([]);

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
    if (!actividades) dispatch(load_list_activity());
  }, []);

  useEffect(() => {
    if (actividades) {
      // Obtener los horarios de clases (available-classes) de la actividad (tengo el id)
      userService.get_Classes_ByActId(id_act).then((response) => {
        setAvailableClasses(response);
      });
      // Conseguir la actividad elegida (tengo el id)
      const actividadElegida = actividades.find((act) => {
        return act.id == id_act;
      });
      setContenido(actividadElegida);
    }
  }, [actividades]);

  async function reservarHandler(event) {
    console.log(availableClasses);
    clearError();
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

  return (
    <section className={classes.actividad_section} id="actividad_section">
      <section>
        <h1>{contenido.name}</h1>
      </section>
      <section>
        <h2>Horarios</h2>
        {availableClasses &&
          availableClasses.map((clas, index) => {
            const time = clas.timeslotDto;
            return (
              <section key={index}>
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
          })}
      </section>
      <section>
        <button onClick={reservarHandler}>Reservar</button>
      </section>
      {appearReserva && (
        <DisplayReserva
          callbackCloseWindow={closeWindowHandler}
          callbackSetError={setErrorText}
          actividad={contenido}
          reserva={reserva}
          amountReserved={amountReserved}
          id_clas={reserva.id}
          id_user={usuario.id}
        />
      )}
      {error && <section><p>{error}</p></section>}
    </section>
  );
}

export default Actividad;

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
  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

  async function submitHandler() {
    try {
      if (canReserve) {
        await reservar_Clase(id_clas, id_user);
        alert("Reserva exitosa")
        navigate("/", {replace: true});
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
          {canReserve ? 
          <button onClick={submitHandler}>Reservar</button> : 
          <section>
            <p>No puede reservarse, no quedan lugares disponibles</p>
          </section>
          }
          <button onClick={callbackCloseWindow}>Cancelar</button>
        </section>
      </section>
    </section>
  );
}
