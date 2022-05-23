import { Link, useNavigate } from "react-router-dom";

import classes from "./mainNavigation.module.css";
import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";

function MainNavigation() {
  const firstName = useSelector(state => state.user.firstName);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO
    // Ver si el user está seteado. Esto setea automaticamente "usernae" en store
    // Recuperar store
    // const token = localStorage.getItem("accessToken");
    // if(token){
    //   // Hace la llamada al back para obtener los datos del usuario correspondiente

    // }
  }, [firstName]);

  function logoClickHandler(){
    navigate("/", { replace: true });
  }

  return (
    <header className={classes.header}>
      <div className={classes.logo} onClick={logoClickHandler}>Club Geminis</div>
      <nav>
        <ul>
          <li>
            <Link to="/actividades">Actividades</Link>
          </li>
          <li>
            <Link to="/planes">Planes</Link>
          </li>
          <li>
            <Link to="/contactos">Contactos</Link>
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
      <Link to="/login">{props.firstName}</Link>
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
