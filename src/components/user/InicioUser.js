import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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

  function logoutHandler() {
    localStorage.removeItem("logued_user");
    dispatch(reiniciarUser());
    navigate("/", { replace: true });
  }

  return (
    <section>
      <section>
        <h1>Hola {user.firstName}</h1>
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
      <button onClick={logoutHandler} className={classes.boton}>Cerrar Sesión</button>
    </section>
  );
}

export default UserInfo;
