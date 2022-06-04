import { Link, useNavigate } from "react-router-dom";
import classes from "./mainNavigation.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import userService from "../../services/user.service";
import { setearEstado } from "../../store/slices/userData/userDataSlice";

function MainNavigation() {
  const firstName = useSelector((state) => state.user.firstName);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {

    // TODO Gets the user with the id set
    // const id_mock = "9fbc73a1-a81c-4625-88f5-34592cbba90b";
    // if (id_mock)
    //   userService.get_User_ById(id_mock).then((response) => {
    //     dispatch(setearEstado(response));
    //   });
  }, []);

  function logoClickHandler() {
    navigate("/", { replace: true });
  }

  return (
    <header className={classes.header}>
      <div className={classes.logo} onClick={logoClickHandler}>
        Club Geminis
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/actividades">Actividades</Link>
          </li>
          <li>
            <Link to="/planes">Planes</Link>
          </li>

          {firstName ? (
            <LoggedSection firstName={firstName} />
          ) : (
            <NotLoggedSection />
          )}
          {/* <NotLoggedSection /> */}
        </ul>
      </nav>
    </header>
  );
}

function LoggedSection(props) {
  // TODO cmopletar para que muestre el nombre y la imagen del usuario
  return (
    <li>
      <Link to="/user">{props.firstName}</Link>
    </li>
  );
}

function NotLoggedSection() {
  return (
    <li>
      <Link to="/login">Iniciar sesion/Registrarse</Link>
    </li>
  );
}

export default MainNavigation;