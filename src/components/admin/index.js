import { useNavigate } from "react-router-dom";
import classes from "./admin.module.css";

function AdminMenu() {
  const navigate = useNavigate();

  function clickHandler(url) {
    navigate(url, { replace: true });
  }

  return (
    <section className={classes.admin_menu}>
      <h1>Menu del Administrador</h1>
      <section className={classes.section_buttons}>
        <button
          onClick={() => clickHandler("/admin/actividades")}
          className={classes.boton}
        >
          Actividades
        </button>
        <button
          onClick={() => clickHandler("/admin/timeslot")}
          className={classes.boton}
        >
          Horarios
        </button>
        <button
          onClick={() => clickHandler("/admin/classes")}
          className={classes.boton}
        >
          Clases
        </button>
        <button
          onClick={() => clickHandler("/admin/assign-role-to-user")}
          className={classes.boton}
        >
          Asignar Roles
        </button>
      </section>
    </section>
  );
}

export default AdminMenu;
