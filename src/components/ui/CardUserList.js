import classes from "./CardUserList.module.css";

function UserRoles(props) {
  const userRoles = props.roles.map((rol, index) => {
    <li key={index}>{rol}</li>;
  });
  return (
    <section className={classes.userRoles}>
      <h2>Roles: </h2>
      <ul>{userRoles}</ul>
    </section>
  );
}

function CardUserList(props) {
  // props.user --> nombre, apellido, edad, DNI, mail, telefono, roles[], foto perfil?
  //  props.key --> index del map

  const user = props.user;

  return (
    <li className={classes.cardUserList} key={props.userKey}>
      {/* <div className={classes.userImg}>
        <img src={user.img} />
      </div> */}
      <h2 className={classes.userName}>
        {user.firstName} {user.lastName}
      </h2>
      <section className={classes.userInfo}>
        <p>Edad: {user.age}</p>
        <p>DNI: {user.dni}</p>
        <p>E-mail: {user.mail}</p>
        <p>Telefono: {user.phone}</p>
      </section>
      <UserRoles roles={user.roles} />
      <section className={classes.section_buttons}>
        <button className="button-float" id="cambiar-roles">
          Modificar Roles
        </button>
        <button className="button-float" id="eliminar-user">
          Dar de Baja
        </button>
      </section>
    </li>
  );
}

export default CardUserList;
