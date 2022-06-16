import SpinnerImg from "./Spinner.gif"
import classes from "./ImgLoading.module.css"

export default function ImgLoading(params) {
  
  return <section className={classes.section_loading_img}>
    <img src={SpinnerImg} alt="Cargando elemento..."/>
  </section>
}