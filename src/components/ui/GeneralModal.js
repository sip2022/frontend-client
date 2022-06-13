import classes from "./GeneralModal.module.css";

export default function GeneralModal({ text, callbackClose, buttonText }) {
  function stopClickHandler(event) {
    event.stopPropagation();
  }

  return (
    <section className={classes.modal_back} onClick={callbackClose}>
      <section className={classes.modal_display} onClick={stopClickHandler}>
        <section>
          <h2>{text}</h2>
        </section>
        <section>
          <button onClick={callbackClose}>{buttonText || "Cerrar"}</button>
        </section>
      </section>
    </section>
  );
}
