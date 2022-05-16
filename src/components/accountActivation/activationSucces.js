import classes from "./activationSucces.module.css";

function ActivationSucces(props) {
  return (
    <section className={classes.activationMessage}>
      <img src="/images/activacion_images/iconoPesa.svg" alt="iconoPesa" />
      <section className={classes.activacionText}>
        <p>¡Su cuenta ha sido registrada con éxito, pero no está activada!</p>
        <p>Para activar su cuenta, use el link que le llegó a su correo.</p>
        {/* TODO Poner el endpoint para reenviar el link de activacion al mail */}
        <p>Si el mail de activacion no llego, <a href="#">haz click aqui!</a></p>
      </section>
    </section>
  );
}

export default ActivationSucces;
