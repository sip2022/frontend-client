import Inicio_Actividades from "../components/homePage/Inicio_Actividades";
import Planes from "../components/homePage/Planes";
import PresentationImage from "../components/homePage/PresentationImage";


function InicioPage() {
  return (
    <section>
      <PresentationImage />
      <Inicio_Actividades />
      <Planes />
    </section>
  );
}

export default InicioPage;