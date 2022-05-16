import classes from "./PresentationImage.module.css";

function PresentationImage(props) {
  return (
    <section className={classes.image_section}>
      <img src="/images/presentacion.jpeg" alt="Imagen de presentacion" />
    </section>
  );
}

export default PresentationImage;
