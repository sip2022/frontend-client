import { useSelector } from "react-redux";
import userService from "../../services/user.service";
import classes from "./activationSucces.module.css";

function ActivationSucces(props) {
  const user = useSelector((state) => state.user);

  function resendHandler(event) {
    event.preventDefault();
    userService.resendActivation(user.id);
  }
  return (
    <section className={classes.activationMessage}>
      <img src="/images/activacion_images/iconoPesa.svg" alt="iconoPesa" />
      <section className={classes.activacionText}>
        <p>¡Su cuenta ha sido registrada con éxito, pero no está activada!</p>
        <p>Para activar su cuenta, use el link que le llegó a su correo.</p>
        {/* TODO Poner el endpoint para reenviar el link de activacion al mail */}
        <p>
          Si el mail de activacion no llego,{" "}
          <a href="#" onClick={resendHandler}>
            haz click aqui!
          </a>
        </p>
      </section>
    </section>
  );
}

export default ActivationSucces;
