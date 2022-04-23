import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardUserList from "../components/ui/CardUserList";
import userService from "../services/user.service";

function UserListPage() {
  const navigate = useNavigate();
  const userList = [];
  const [isAdmin, setIsAdmin] = useState(false);
  // const users = [];
  const users = [
    {
      dni: 12345678,
      firstName: "seba",
      lastName: "marchetti",
      age: 23,
      mail: "fakemail@mail.com",
      phone: "2323-123456",
      roles: ["Admin"],
    },
    {
      dni: 12345678,
      firstName: "angel",
      lastName: "Luis",
      age: 23,
      mail: "fakemail@mail.com",
      phone: "2323-123456",
      roles: ["Admin", "Profesor"],
    },
  ];

  useEffect(() => {
    // Gets all users. If 403 forbidden, show "not allowed" sign
    // userService
    //   .getUserList()
    //   .then((response) => {
    //     console.log(response);
    //     setIsAdmin(true);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setIsAdmin(false);
    //   });
    setIsAdmin(true);
  }, []);

  return (
    <section>
      {isAdmin ? (
        <UserList users={users} />
      ) : (
        <NotAdminMessage navigate={navigate} />
      )}
    </section>
  );
}

export default UserListPage;

function NotAdminMessage(props) {
  function goHome(event) {
    event.preventDefault();
    props.navigate("/", { replace: true });
  }

  return (
    <section>
      <p>¡No tienes permiso de ver esta página!</p>
      <section>
        <a id="volver-home" href="/home.html" onClick={goHome}>
          Volver al home
        </a>
      </section>
    </section>
  );
}

function UserList(props) {
  // Devuelve lista de usuarios
  // props.users

  return (
    <section>
      <h1>Lista de Usuarios</h1>
      <ul>
        {props.users.map((user, index) => {
          return <CardUserList user={user} userKey={index} />;
        })}
      </ul>
    </section>
  );
}
