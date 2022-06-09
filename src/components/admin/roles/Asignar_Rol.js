import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../../services/user.service";
import { assignRoltoUser } from "../../../utils/crud";

export default function Asignar_Rol() {
  const navigate = useNavigate();

  const [roles, setRoles] = useState(null);
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      userService.get_User_List().then((response) => {
        setUsers(response);
      });
      userService.get_Roles_List().then((response) => {
        setRoles(response);
      });
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function submitHandler() {
    const select_user = document.getElementById("input-users");
    const id_user =
      select_user.options[select_user.selectedIndex].getAttribute("id_user");

    const select_rol = document.getElementById("input-roles");
    const id_rol =
      select_rol.options[select_rol.selectedIndex].getAttribute("id_rol");

    try {
      await assignRoltoUser(id_user, id_rol);
      alert("¡Rol asignado exitosamente!");
      navigate("/admin", { replace: true });
    } catch (error) {
      console.log(error);
    }
  }

  function clickHandler() {
    navigate("/admin", { replace: true });
  }

  return (
    <section>
      <h1>Asignar Rol a un Usuario</h1>
      {users && roles ? (
        <section>
          <section>
            <p>Usuario: </p>
            <DropdownSelectUsers list={users} />
            <p>Roles: </p>
            <DropdownSelectRoles list={roles} />
          </section>
          <section>
            <button onClick={submitHandler}>Asignar Rol</button>
          </section>
        </section>
      ) : (
        <p>Cargando usuarios y roles...</p>
      )}
      <section>
        <button onClick={clickHandler}>Volver</button>
      </section>
    </section>
  );
}

function DropdownSelectUsers({ list }) {
  return (
    list && (
      <select id={"input-users"}>
        {list.map((item, index) => {
          return (
            <option
              key={index}
              id_user={item.id}
              value={item.firstName + " " + item.lastName}
            >
              {item.firstName + " " + item.lastName}
            </option>
          );
        })}
      </select>
    )
  );
}
function DropdownSelectRoles({ list }) {
  return (
    list && (
      <select id={"input-roles"}>
        {list.map((item, index) => {
          return (
            <option key={index} id_rol={item.id} value={item.name}>
              {item.name}
            </option>
          );
        })}
      </select>
    )
  );
}
