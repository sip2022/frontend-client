import classes from "./CardUserList.module.css";

const UserRoles = ({ roles }) => {
  const userRoles = roles.map((rol) => {
    <li>{rol}</li>;
  });

  return (
    <section className="user-roles">
      <h2>Roles: </h2>
      <ul>{userRoles}</ul>
    </section>
  );
};

function CardUserList(props) {
  // props.user --> nombre, apellido, edad, DNI, mail, telefono, roles[], foto perfil?
  //  props.key --> index del map

  const user = props.user;

  return (
    <li className={classes.cardUserList} key={props.key}>
      <img src={user.img} className={classes.img} />
      <h2 className={classes.nombre}>
        {user.firstName} {user.lastName}
      </h2>
      <section className="user-datos">
        <p>Edad: {user.age}</p>
        <p>DNI: {user.dni}</p>
        <p>E-mail: {user.mail}</p>
        <p>Telefono: {user.phone}</p>
      </section>
      <UserRoles roles={user.roles} />
      <section className="section-buttons">
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
