import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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

  const user = useSelector((state) => state.user);

  useEffect(() => {
    // TODO get info del estado del usuario
    // if(usuario no está logueado)
    //   navigate("/login", { replace: true });
  }, []);

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
        {user.roles && user.roles.find(elem => elem == "ROLE_ADMIN") && (
          <ItemCard
            titulo="Menú de Administrador"
            link="/admin"
            navigate={navigate}
          />
        )}
      </section>
    </section>
  );
}

export default UserInfo;
