import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./admin.module.css"

function AdminMenu(params) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  function clickHandler(url) {
    navigate(url, { replace: true });
  }

  return (
    <section className={classes.admin_menu}>
      <h1>Admin Menu</h1>
      <button onClick={() => clickHandler("/admin/actividades")}>
        Actividades
      </button>
      <button onClick={() => clickHandler("/admin/timeslot")}>Horarios</button>
      <button onClick={() => clickHandler("/admin/classes")}>Clases</button>
    </section>
  );
}

export default AdminMenu;
