import { useEffect } from "react";
import { useSelector } from "react-redux";
import userService from "../../../services/user.service";

function UserTurnos(params) {
  const turnos = useSelector((state) => state.user.turnos);

  useEffect(() => {
    console.log([turnos]);
    const userTurnos = userService.get_User_Turnos().then((response) => {
      console.log(response);
    });
  }, []);

  return (
    <section>
      <h1>Mis turnos</h1>
      {turnos &&
        turnos.map((turno, index) => {
          return (
            <section>
              <p>{"Turno" + index}</p>
            </section>
            // <TurnoCard {...turno} />
          );
        })}
    </section>
  );
}

export default UserTurnos;

function TurnoCard({ dayOfWeek, startTime, endTime, actividadName }) {
  useEffect(() => {
    console.log(dayOfWeek);
  }, []);

  return (
    <section>
      <p>
        {dayOfWeek +
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
    </section>
  );
}
