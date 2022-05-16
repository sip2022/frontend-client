import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const [{ nombre }, setDatos] = useState({
    nombre: "",
  });

  useEffect(() => {
    // TODO get info del estado del usuario
    // if(usuario no está logueado)
    //   navigate("/login", { replace: true });
    setDatos({
      nombre: "Seba"
    })
  }, []);

  return (
    <section>
      <section>
        <h1>Hola {nombre}</h1>
      </section>
      <section className={classes.sectionCards}>
        <ItemCard titulo="Informacion Personal" link="/user/info" navigate={navigate} />
        <ItemCard titulo="Mis Turnos" link="#" navigate={navigate} />
        <ItemCard titulo="Mis Pagos" link="#" navigate={navigate} />
        <ItemCard titulo="Cronograma de Actividades" link="#" navigate={navigate} />
      </section>
    </section>
  );
}

export default UserInfo;
