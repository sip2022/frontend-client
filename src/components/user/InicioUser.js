import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userService from "../../services/user.service";
import { reiniciarUser } from "../../store/slices/userData/userDataSlice";
import classes from "./InicioUser.module.css";

function ItemCard({ titulo, link, navigate }) {
  function clickHandler(event) {
    event.preventDefault();
    navigate(link, { replace: true });
  }

  return (
    <section className={classes.itemCard} onClick={clickHandler}>
      <img src="/images/user_images/gym-list.svg" alt="Icono Item" />
      <h3>{titulo}</h3>
    </section>
  );
}

function UserInfo(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const [subs, setSubs] = useState(null);

  // Aquí iría la cantidad de actividades extra que puede reservar
  // Si es 0, explica que no puede reservar otra acitvidad, pero puede reservar horarios de las actividades actuales
  const [cantActMock, setCantActMock] = useState(0);

  useEffect(() => {
    userService.get_Subscriptions_ByUserId(user.id).then((response) => {
      if (response.length > 0) setSubs(response[response.length - 1]);
    });
  }, []);

  function logoutHandler() {
    localStorage.removeItem("logued_user");
    dispatch(reiniciarUser());
    navigate("/", { replace: true });
  }

  function cantActividades() {
    if (cantActMock > 0) {
      if (cantActMock == 1) return "Puedes reserar 1 actividad más";
    } else
      return "No puedes reservar más actividades, pero aún puedes anotarte en clases de tus actividades actuales";
    return "Puedes reservar " + cantActMock + " actividades más";
  }

  return (
    <section>
      <section>
        {subs ? (
          <h1 className={classes[subs.planDto.name]}>
            Hola {user.firstName + " " + user.lastName} <br />
            Plan: {subs.planDto.name}
          </h1>
        ) : (
          <h1>Hola {user.firstName + " " + user.lastName}</h1>
        )}
        {subs && (
          <h2>
            Has reservado {"X"} actividades <br />
            {cantActividades()}
          </h2>
        )}
      </section>
      <section className={classes.sectionCards}>
        <ItemCard
          titulo="Informacion Personal"
          link="/user/info"
          navigate={navigate}
        />
        <ItemCard
          titulo="Mis Reservas"
          link="/user/reservas"
          navigate={navigate}
        />
        <ItemCard titulo="Mis Pagos" link="/user/pagos" navigate={navigate} />
        {user.roles && user.roles.find((elem) => elem == "ROLE_ADMIN") && (
          <ItemCard
            titulo="Menú de Administrador"
            link="/admin"
            navigate={navigate}
          />
        )}
      </section>
      <button onClick={logoutHandler} className={classes.boton}>
        Cerrar Sesión
      </button>
    </section>
  );
}

export default UserInfo;
