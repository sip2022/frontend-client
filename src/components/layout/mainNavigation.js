import { Link, useNavigate } from "react-router-dom";
import classes from "./mainNavigation.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import userService from "../../services/user.service";
import { setearEstado } from "../../store/slices/userData/userDataSlice";
import axios from "axios";
import { backAPI } from "../../utils/globalVars";

function MainNavigation() {
  const firstName = useSelector((state) => state.user.firstName);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // TODO borrar esta linea
    // localStorage.setItem("logued_user", "e9f25739-0bff-4ae2-852c-8aeb9db7defb");

    // const id_logued = localStorage.getItem("logued_user");
    // if (id_logued)
    //   userService.get_User_ById(id_logued).then((response) => {
    //     dispatch(setearEstado(response));
    //   });

    // TODO Esto es un mock, para recuperar al usuario cn el mail
    const email_user = "analyst@mail.com";
    axios
      .post(backAPI + "/user/find-by-email/", {
        email: email_user,
      })
      .then((response) => {
        dispatch(setearEstado(response.data));
      });
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
